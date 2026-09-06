import { useEffect } from "react";
import { AuthMnLogo } from "./logo";
import { ensureStyles } from "./styles";
import { DEFAULT_AUTH_URL, LABELS, type AuthMnButtonProps } from "./types";

/** Одоогийн хуудасны query/hash-гүй цэвэр URL */
export function currentCleanUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname;
}

/** Auth.mn нэвтрэх хуудас руу redirect хийнэ */
export function redirectToAuthMn(opts?: { authUrl?: string; redirectUrl?: string }): void {
  if (typeof window === "undefined") return;
  const authUrl = (opts?.authUrl || DEFAULT_AUTH_URL).replace(/\/$/, "");
  const back = opts?.redirectUrl || currentCleanUrl();
  window.location.href = `${authUrl}/login?redirect=${encodeURIComponent(back)}`;
}

/**
 * "Sign in with Auth.mn" — redirect flow.
 * Дарахад auth.mn/login руу очиж, нэвтэрсний дараа redirectUrl?authToken=... буцна.
 * Token-ыг `useAuthMnCallback` hook-оор барина.
 */
export function AuthMnButton({
  authUrl,
  redirectUrl,
  buttonType = "signin",
  label,
  onClick,
  theme = "dark",
  size = "md",
  radius = 10,
  fullWidth,
  disabled,
  className,
  style
}: AuthMnButtonProps) {
  useEffect(ensureStyles, []);

  const text = label ?? LABELS[buttonType];
  const cls = [
    "amr-btn",
    `amr-btn--${theme}`,
    `amr-btn--${size}`,
    fullWidth ? "amr-btn--full" : "",
    className || ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={cls}
      style={{ borderRadius: radius, ...style }}
      disabled={disabled}
      aria-label={text}
      onClick={() => (onClick ? onClick() : redirectToAuthMn({ authUrl, redirectUrl }))}
    >
      <span className="amr-btn__logo">
        <AuthMnLogo size={size === "lg" ? 20 : 18} />
      </span>
      {buttonType === "plain" && !label ? (
        <span className="amr-btn__brand">Auth.mn</span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
