import { useEffect } from "react";
import { AuthMnButton } from "./AuthMnButton";
import { AuthMnQrButton } from "./AuthMnQrButton";
import { ensureStyles } from "./styles";
import type { AuthMnButtonProps, AuthMnQrButtonProps } from "./types";

export interface AuthMnLoginRowProps {
  /** Redirect товчны props (8/12) */
  button?: Omit<AuthMnButtonProps, "fullWidth">;
  /** QR товчны props (4/12) — onSuccess заавал */
  qr: Omit<AuthMnQrButtonProps, "fullWidth">;
  /** Хоёуланд нь нийтлэг */
  size?: AuthMnButtonProps["size"];
  radius?: number;
  className?: string;
}

/**
 * Нэг мөрөнд: [ Auth.mn-ээр нэвтрэх (8/12) ] [ QR-аар (4/12) ]
 * Google/Facebook social login row шиг мэдрэмж.
 */
export function AuthMnLoginRow({ button, qr, size = "md", radius = 10, className }: AuthMnLoginRowProps) {
  useEffect(ensureStyles, []);
  return (
    <div className={["amr-row", className || ""].filter(Boolean).join(" ")}>
      <div className="amr-row__main">
        <AuthMnButton fullWidth size={size} radius={radius} theme="dark" {...button} />
      </div>
      <div className="amr-row__side">
        <AuthMnQrButton fullWidth size={size} radius={radius} theme="light" {...qr} />
      </div>
    </div>
  );
}
