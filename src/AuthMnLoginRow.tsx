import { useEffect } from "react";
import { AuthMnButton } from "./AuthMnButton";
import { AuthMnQrButton } from "./AuthMnQrButton";
import { ensureStyles } from "./styles";
import type { AuthMnButtonProps, AuthMnQrButtonProps } from "./types";

export interface AuthMnLoginRowProps {
  /** Auth.mn товчны props */
  button?: Omit<AuthMnButtonProps, "fullWidth">;
  /** QR-ийн props — onSuccess заавал */
  qr: Omit<AuthMnQrButtonProps, "fullWidth">;
  /**
   * icon (default): баруун талд дөрвөлжин QR icon товч (дарвал modal-д QR)
   * inline: баруун талд QR кодыг шууд харуулна, зүүн талд товч + тайлбар
   * button: баруун талд "QR-аар нэвтрэх" товч (modal)
   */
  qrDisplay?: "icon" | "inline" | "button";
  /** inline үед QR-ийн хэмжээ px (default 96) */
  qrSize?: number;
  /** inline үед товчны доорх тайлбар */
  hint?: string;
  size?: AuthMnButtonProps["size"];
  radius?: number;
  className?: string;
}

/**
 * Нэг мөрөнд:
 *   icon:   [ Auth.mn-ээр нэвтрэх | G f S ] [▦]
 *   inline: [ Auth.mn-ээр нэвтрэх | G f S ]  [QR]
 *           [ Auth.mn аппаар уншуулна уу  ]
 *   button: [ Auth.mn-ээр нэвтрэх (8/12) ] [ QR-аар нэвтрэх (4/12) ]
 */
export function AuthMnLoginRow({
  button,
  qr,
  qrDisplay = "icon",
  qrSize = 96,
  hint = "эсвэл Auth.mn аппаар QR уншуулна уу",
  size = "md",
  radius = 10,
  className
}: AuthMnLoginRowProps) {
  useEffect(ensureStyles, []);

  if (qrDisplay === "icon") {
    return (
      <div className={["amr-row", "amr-row--icon", className || ""].filter(Boolean).join(" ")}>
        <div className="amr-row__main">
          <AuthMnButton fullWidth size={size} radius={radius} theme="dark" {...button} />
        </div>
        <div className="amr-row__side">
          <AuthMnQrButton iconOnly size={size} radius={radius} theme="outline" {...qr} />
        </div>
      </div>
    );
  }

  if (qrDisplay === "inline") {
    return (
      <div className={["amr-row", "amr-row--inline", className || ""].filter(Boolean).join(" ")}>
        <div className="amr-row__main amr-row__stack">
          <AuthMnButton fullWidth size={size} radius={radius} theme="dark" {...button} />
          <span className="amr-row__hint">{hint}</span>
        </div>
        <div className="amr-row__side">
          <AuthMnQrButton display="inline" qrSize={qrSize} radius={radius} {...qr} />
        </div>
      </div>
    );
  }

  return (
    <div className={["amr-row", className || ""].filter(Boolean).join(" ")}>
      <div className="amr-row__main">
        <AuthMnButton fullWidth size={size} radius={radius} theme="dark" {...button} />
      </div>
      <div className="amr-row__side">
        <AuthMnQrButton fullWidth size={size} radius={radius} theme="outline" label="QR-аар нэвтрэх" {...qr} />
      </div>
    </div>
  );
}
