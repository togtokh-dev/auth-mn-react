import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import { io, type Socket } from "socket.io-client";
import { AuthMnLogo, QrIcon } from "./logo";
import { ensureStyles } from "./styles";
import {
  DEFAULT_API_URL,
  DEFAULT_AUTH_URL,
  DEFAULT_SOCKET_PATH,
  type AuthMnQrButtonProps
} from "./types";

type Phase = "idle" | "connecting" | "ready" | "success" | "expired" | "error";

/** Auth.mn socket-ийн push бүтэц: { data, new_date, socket_id } */
type Push<T> = { data: T };

/**
 * "QR-аар нэвтрэх" — Auth.mn аппаар QR уншуулж, socket-оор token авна.
 *
 * Урсгал:
 *  1. socket холбогдоод `login-qr` emit → сервер `login-qr-create` {uuid}
 *  2. QR харуулна (uuid-г authUrl/qr-login?uuid= хэлбэрээр)
 *  3. Апп уншаад зөвшөөрөхөд сервер `login-qr-success` {token} → onSuccess(token)
 */
export function AuthMnQrButton({
  apiUrl = DEFAULT_API_URL,
  socketPath = DEFAULT_SOCKET_PATH,
  authUrl = DEFAULT_AUTH_URL,
  desc,
  qrValue,
  onSuccess,
  onError,
  expiresIn = 300,
  iconOnly,
  label = "QR-аар нэвтрэх",
  title = "Auth.mn аппаар уншуулна уу",
  theme = "light",
  size = "md",
  radius = 10,
  fullWidth,
  disabled,
  className,
  style
}: AuthMnQrButtonProps) {
  useEffect(ensureStyles, []);

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [uuid, setUuid] = useState("");
  const [left, setLeft] = useState(expiresIn);
  const [errorMsg, setErrorMsg] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const teardown = useCallback(() => {
    socketRef.current?.removeAllListeners();
    socketRef.current?.disconnect();
    socketRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const fail = useCallback(
    (msg: string) => {
      setErrorMsg(msg);
      setPhase("error");
      onError?.(msg);
    },
    [onError]
  );

  const start = useCallback(() => {
    teardown();
    setPhase("connecting");
    setUuid("");
    setLeft(expiresIn);

    const socket = io(apiUrl, {
      path: socketPath,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      timeout: 8000
    });
    socketRef.current = socket;

    const siteDesc =
      desc || (typeof window !== "undefined" ? window.location.host : "web");

    socket.on("connect", () => socket.emit("login-qr", { desc: siteDesc }));

    socket.on("login-qr-create", (p: Push<{ uuid: string }>) => {
      const id = p?.data?.uuid;
      if (!id) return fail("QR үүсгэж чадсангүй.");
      setUuid(id);
      setPhase("ready");
      setLeft(expiresIn);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setLeft((s) => {
          if (s <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setPhase("expired");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    });

    socket.on("login-qr-success", (p: Push<{ token: string }>) => {
      const token = p?.data?.token;
      if (!token) return fail("Token ирсэнгүй.");
      setPhase("success");
      teardown();
      // Амжилтын төлөвийг харуулаад хаана
      setTimeout(() => {
        setOpen(false);
        onSuccess(token);
      }, 600);
    });

    socket.on("connect_error", () => fail("Auth.mn сервертэй холбогдож чадсангүй."));
  }, [apiUrl, socketPath, desc, expiresIn, teardown, fail, onSuccess]);

  useEffect(() => {
    if (open) start();
    else teardown();
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ESC хаана
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const value = uuid
    ? qrValue
      ? qrValue(uuid)
      : `${authUrl.replace(/\/$/, "")}/qr-login?uuid=${encodeURIComponent(uuid)}`
    : "";

  const cls = [
    "amr-btn",
    `amr-btn--${theme}`,
    `amr-btn--${size}`,
    fullWidth ? "amr-btn--full" : "",
    iconOnly ? "amr-btn--icon" : "",
    className || ""
  ]
    .filter(Boolean)
    .join(" ");

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="amr-overlay" onClick={() => setOpen(false)} role="presentation">
            <div
              className="amr-modal"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="amr-modal__close"
                aria-label="Хаах"
                onClick={() => setOpen(false)}
              >
                ×
              </button>

              <div className="amr-modal__head">
                <AuthMnLogo size={28} />
                <div>
                  <p className="amr-modal__title">{title}</p>
                  <p className="amr-modal__sub">Auth.mn апп → Профайл → QR уншуулах</p>
                </div>
              </div>

              <div className="amr-qr">
                {value && (phase === "ready" || phase === "success") && (
                  <QRCode value={value} size={256} style={{ width: "100%", height: "auto" }} />
                )}
                {phase === "connecting" && (
                  <div className="amr-qr__mask">
                    <span className="amr-spinner" />
                    Холбогдож байна…
                  </div>
                )}
                {phase === "expired" && (
                  <div className="amr-qr__mask">
                    QR-ийн хугацаа дууслаа
                    <button type="button" className="amr-link" onClick={start}>
                      Шинэ QR авах
                    </button>
                  </div>
                )}
                {phase === "error" && (
                  <div className="amr-qr__mask">
                    {errorMsg}
                    <button type="button" className="amr-link" onClick={start}>
                      Дахин оролдох
                    </button>
                  </div>
                )}
                {phase === "success" && (
                  <div className="amr-qr__mask amr-qr__mask--ok">✓ Амжилттай нэвтэрлээ</div>
                )}
              </div>

              <ol className="amr-steps">
                <li>
                  <b>1</b> Auth.mn аппаа нээгээд <strong>QR уншуулах</strong> сонгоно
                </li>
                <li>
                  <b>2</b> Энэ QR кодыг уншуулна
                </li>
                <li>
                  <b>3</b> Апп дээр <strong>Зөвшөөрөх</strong> дарахад энд автоматаар нэвтэрнэ
                </li>
              </ol>

              <div className="amr-modal__foot">
                <span>{phase === "ready" ? `Хүчинтэй: ${mm}:${ss}` : ""}</span>
                {phase === "ready" && (
                  <button type="button" className="amr-link" onClick={start}>
                    Шинэчлэх
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={cls}
        style={{ borderRadius: radius, ...style }}
        disabled={disabled}
        aria-label={label}
        title={iconOnly ? label : undefined}
        onClick={() => setOpen(true)}
      >
        <span className="amr-btn__logo">
          <QrIcon size={size === "lg" ? 20 : 18} />
        </span>
        {!iconOnly && <span>{label}</span>}
      </button>
      {modal}
    </>
  );
}
