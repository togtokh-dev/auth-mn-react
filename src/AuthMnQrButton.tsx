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

type Phase = "idle" | "connecting" | "ready" | "scanned" | "success" | "rejected" | "expired" | "error";

/** Auth.mn socket-ийн push бүтэц: { data, new_date, socket_id } */
type Push<T> = { data: T };

/**
 * QR-аар нэвтрэх — Auth.mn аппаар QR уншуулж, socket-оор token авна.
 *
 * display="button" (default): товч → modal дотор QR
 * display="inline":           QR-ийг шууд харуулна (mount дээр холбогдоно), дарвал томруулна
 *
 * Урсгал: socket → `login-qr` → `login-qr-create` {uuid} → QR → апп зөвшөөрөх →
 *         `login-qr-success` {token} → onSuccess(token)
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
  display = "button",
  qrSize = 96,
  iconOnly,
  label = "QR-аар нэвтрэх",
  title = "Auth.mn аппаар уншуулна уу",
  theme = "outline",
  size = "md",
  radius = 10,
  fullWidth,
  disabled,
  className,
  style
}: AuthMnQrButtonProps) {
  useEffect(ensureStyles, []);

  const inline = display === "inline";
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

    const siteDesc = desc || (typeof window !== "undefined" ? window.location.host : "web");
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

    // Апп QR-ийг уншлаа — зөвшөөрөл хүлээж байна
    socket.on("login-qr-scan", () => setPhase((ph) => (ph === "ready" ? "scanned" : ph)));

    // Апп дээр татгалзлаа
    socket.on("login-qr-reject", () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setPhase("rejected");
    });

    socket.on("login-qr-success", (p: Push<{ token: string }>) => {
      const token = p?.data?.token;
      if (!token) return fail("Token ирсэнгүй.");
      setPhase("success");
      teardown();
      setTimeout(() => {
        setOpen(false);
        onSuccess(token);
      }, 600);
    });

    socket.on("connect_error", () => fail("Auth.mn сервертэй холбогдож чадсангүй."));
  }, [apiUrl, socketPath, desc, expiresIn, teardown, fail, onSuccess]);

  // inline: mount дээр эхэлж unmount дээр салгана; button: modal нээхэд эхэлж хаахад салгана
  useEffect(() => {
    if (inline) {
      if (!disabled) start();
      return teardown;
    }
    if (open) start();
    else teardown();
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inline ? disabled : open]);

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

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  const qrBody = (big: boolean) => (
    <>
      {value && (phase === "ready" || phase === "scanned" || phase === "success") && (
        <QRCode value={value} size={big ? 256 : qrSize} style={{ width: "100%", height: "auto" }} />
      )}
      {phase === "connecting" && (
        <div className="amr-qr__mask">
          <span className="amr-spinner" />
          {big && "Холбогдож байна…"}
        </div>
      )}
      {phase === "expired" && (
        <div className="amr-qr__mask">
          {big ? "QR-ийн хугацаа дууслаа" : "Дууссан"}
          <button type="button" className="amr-link" onClick={(e) => { e.stopPropagation(); start(); }}>
            {big ? "Шинэ QR авах" : "Шинэчлэх"}
          </button>
        </div>
      )}
      {phase === "error" && (
        <div className="amr-qr__mask">
          {big ? errorMsg : "Алдаа"}
          <button type="button" className="amr-link" onClick={(e) => { e.stopPropagation(); start(); }}>
            Дахин
          </button>
        </div>
      )}
      {phase === "scanned" && (
        <div className="amr-qr__mask">
          <span className="amr-spinner" />
          {big ? "Апп дээр зөвшөөрөл хүлээж байна…" : "Хүлээж байна"}
        </div>
      )}
      {phase === "rejected" && (
        <div className="amr-qr__mask amr-qr__mask--bad">
          {big ? "Апп дээр татгалзсан байна" : "Татгалзсан"}
          <button type="button" className="amr-link" onClick={(e) => { e.stopPropagation(); start(); }}>
            {big ? "Шинэ QR авах" : "Шинэчлэх"}
          </button>
        </div>
      )}
      {phase === "success" && (
        <div className="amr-qr__mask amr-qr__mask--ok">{big ? "✓ Амжилттай нэвтэрлээ" : "✓"}</div>
      )}
    </>
  );

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="amr-overlay" onClick={() => setOpen(false)} role="presentation">
            <div className="amr-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
              <button type="button" className="amr-modal__close" aria-label="Хаах" onClick={() => setOpen(false)}>
                ×
              </button>
              <div className="amr-modal__head">
                <AuthMnLogo size={40} variant="black" />
                <div>
                  <p className="amr-modal__title">{title}</p>
                  <p className="amr-modal__sub">Auth.mn апп · Профайл · QR уншуулах</p>
                </div>
              </div>
              <div className="amr-qr">{qrBody(true)}</div>
              <ol className="amr-steps">
                <li><b>1</b><span>Auth.mn аппаа нээгээд <strong>QR уншуулах</strong> сонгоно</span></li>
                <li><b>2</b><span>Энэ QR кодыг уншуулна</span></li>
                <li><b>3</b><span>Апп дээр <strong>Зөвшөөрөх</strong> дарахад энд автоматаар нэвтэрнэ</span></li>
              </ol>
              <div className="amr-modal__foot">
                <span>{phase === "ready" || phase === "scanned" ? `Хүчинтэй: ${mm}:${ss}` : ""}</span>
                {(phase === "ready" || phase === "scanned") && (
                  <button type="button" className="amr-link" onClick={start}>Шинэчлэх</button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  if (inline) {
    return (
      <>
        <button
          type="button"
          className={["amr-qr-inline", className || ""].filter(Boolean).join(" ")}
          style={{ width: qrSize, height: qrSize, borderRadius: radius, ...style }}
          disabled={disabled}
          aria-label={title}
          title="Томруулах"
          onClick={() => setOpen(true)}
        >
          {qrBody(false)}
        </button>
        {modal}
      </>
    );
  }

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
        <span className="amr-btn__logo"><QrIcon size={size === "lg" ? 20 : 18} /></span>
        {!iconOnly && <span className="amr-btn__label">{label}</span>}
      </button>
      {modal}
    </>
  );
}
