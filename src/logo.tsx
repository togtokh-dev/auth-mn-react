import type { CSSProperties } from "react";

/* Auth.mn брэнд тэмдэг — зургаан өнцөгт + "A" (83×90). Tile/дэвсгэргүй. */
const HEX = "M82.4901 30.2075L82.4001 59.7375C82.3801 65.2275 79.44 70.2975 74.68 73.0675L49.0501 87.9075C44.2201 90.7076 38.26 90.7076 33.44 87.9075L7.81004 73.0675C3.04004 70.3075 0.100066 65.2375 0.0900659 59.7375L0.000100044 30.2075C-0.0199 24.6475 2.96004 19.5075 7.81004 16.7375L33.5301 2.0475C38.3101 -0.6825 44.1901 -0.6825 48.9801 2.0475L74.7001 16.7375C79.5401 19.5075 82.5201 24.6475 82.5101 30.2075H82.4901Z";
const A = "M65.0002 31.9275L50.7603 40.1175C45.9603 42.8775 42.9902 47.9875 42.9902 53.5075V78.5175C42.9902 80.7475 45.4202 82.1475 47.3602 81.0275L51.2903 78.7575C53.0903 77.7175 54.2002 75.8075 54.2002 73.7375V66.0675L65.4203 59.6175V65.6175C65.4203 67.8475 67.8503 69.2475 69.7903 68.1275L73.7302 65.8675C75.5302 64.8275 76.6403 62.9175 76.6403 60.8475V38.6275C76.6403 32.6775 70.1702 28.9575 65.0002 31.9375V31.9275ZM65.4302 51.2275L54.2102 57.6775V50.7375C54.2102 49.7075 54.7703 48.7475 55.6703 48.2275L63.2502 43.8675C64.2202 43.3075 65.4302 44.0075 65.4302 45.1275V51.2275Z";
const RATIO = 83 / 90;

/**
 * black   — хар зургаан өнцөгт, цагаан A (цайвар товч/дэвсгэрт)
 * white   — цагаан зургаан өнцөгт, хар A (хар товч/дэвсгэрт)
 * outline — контур currentColor (outline товч — ямар ч дэвсгэрт)
 */
export type LogoVariant = "black" | "white" | "outline";

export function AuthMnLogo({ size = 20, variant = "black", style }: { size?: number; variant?: LogoVariant; style?: CSSProperties }) {
  const w = Math.round(size * RATIO);
  if (variant === "outline") {
    return (
      <svg width={w} height={size} viewBox="-3 -3 89 96" fill="none" aria-hidden="true" style={style}>
        <path d={HEX} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
        <path d={A} fill="currentColor" />
      </svg>
    );
  }
  const white = variant === "white";
  return (
    <svg width={w} height={size} viewBox="0 0 83 90" fill="none" aria-hidden="true" style={style}>
      <path d={HEX} fill={white ? "#fff" : "#000"} />
      <path d={A} fill={white ? "#000" : "#fff"} />
    </svg>
  );
}

/** QR дүрс — QR товчинд */
export function QrIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3M21 14v3M14 21h3M21 21h.01M18 18h.01" />
    </svg>
  );
}

/* ── 3rd party provider дүрснүүд (Auth.mn-ээр дамжин орж ирдэг) ── */
export type ProviderName = "google" | "facebook" | "steam" | "apple";

export function ProviderIcon({ name, size = 14 }: { name: ProviderName; size?: number }) {
  if (name === "google") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.3 39.6 16.1 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.3l6.3 5.3C40.9 35.8 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#1877F2" />
        <path fill="#fff" d="M31.9 29.7 32.8 24h-5.5v-3.7c0-1.6.8-3.1 3.3-3.1h2.5v-4.9s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V24h-5.1v5.7h5.1v14c1 .2 2.1.3 3.1.3s2.1-.1 3.1-.3V29.7h4.7z" />
      </svg>
    );
  }
  if (name === "apple") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.2zM13.9 5c.7-.9 1.2-2.1 1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.4-.6 3.1-1.5z" />
      </svg>
    );
  }
  // steam
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#1B2838" />
      <path fill="#fff" d="M22.8 18.1v.1l-5.8 8.4c-.9 0-1.9.1-2.8.5-.4.2-.7.4-1.1.6L.4 22.4s-.3 4.8.9 8.4l9 3.7c.4 2 1.8 3.8 3.9 4.6 1.6.7 3.4.7 5 0 1.6-.7 2.9-1.9 3.5-3.5.4-.9.5-1.8.5-2.7l8.3-5.9h.2c5 0 9-4 9-9s-4-9-9-9c-4.9.1-8.9 4.1-8.9 9.1zm-1.4 17c-1.1 2.6-4 3.8-6.6 2.7-1.1-.5-2.1-1.4-2.6-2.5l2.9 1.2c1.9.8 4.1-.1 4.9-2 .8-1.9-.1-4.1-2-4.9l-3-1.3c1.2-.4 2.5-.5 3.7 0 1.3.5 2.2 1.5 2.8 2.8.5 1.2.5 2.6-.1 4zm10.3-11c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-4.5-6c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5z" />
    </svg>
  );
}
