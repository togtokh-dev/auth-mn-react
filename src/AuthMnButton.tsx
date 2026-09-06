import { useEffect } from "react";
import { AuthMnLogo, ProviderIcon } from "./logo";
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
 *   [лого] Auth.mn-ээр нэвтрэх | G f S
 * Баруун талын жижиг лого нь Auth.mn-ээр Google/Facebook/Steam г.м. бүх
 * 3rd party нэвтрэлт орж ирдгийг ойлгуулна (providers prop-оор солино, [] бол нуугдана).
 * Нэвтэрсний дараа redirectUrl?authToken=... буцна → `useAuthMnCallback`.
 */
export function AuthMnButton({
  authUrl,
  redirectUrl,
  buttonType = "signin",
  label,
  onClick,
  providers = ["google", "facebook", "steam"],
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
  const showProviders = providers.length > 0 && buttonType !== "plain";
  const cls = [
    "amr-btn",
    `amr-btn--${theme}`,
    `amr-btn--${size}`,
    fullWidth ? "amr-btn--full" : "",
    showProviders ? "amr-btn--providers" : "",
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
        <AuthMnLogo
          size={size === "lg" ? 24 : size === "sm" ? 18 : 22}
          variant={theme === "light" ? "black" : "outline"}
        />
      </span>
      {buttonType === "plain" && !label ? (
        <span className="amr-btn__brand">Auth.mn</span>
      ) : (
        <span className="amr-btn__label">{text}</span>
      )}
      {showProviders && (
        <span className="amr-btn__providers" aria-hidden="true">
          {providers.map((p) => (
            <ProviderIcon key={p} name={p} size={size === "lg" ? 16 : 14} />
          ))}
        </span>
      )}
    </button>
  );
}
