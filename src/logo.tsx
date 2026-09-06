import type { CSSProperties } from "react";

/** Auth.mn брэнд тэмдэг — бамбай + check (Google "G" шиг үргэлж адилхан харагдана) */
export function AuthMnLogo({
  size = 18,
  style
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={style}
    >
      <defs>
        <linearGradient id="amr-g" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F8BFF" />
          <stop offset="1" stopColor="#1A56DB" />
        </linearGradient>
      </defs>
      <path d="M12 2 3 6v6c0 5 3.8 8.6 9 10 5.2-1.4 9-5 9-10V6l-9-4z" fill="url(#amr-g)" />
      <path
        d="m8.3 12 2.4 2.4 5-4.9"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
