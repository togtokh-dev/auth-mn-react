export type AuthMnTheme = "dark" | "light" | "outline";
export type AuthMnSize = "sm" | "md" | "lg";
/** Google Pay-ийн buttonType шиг — товчны үг */
export type AuthMnButtonType = "signin" | "continue" | "login" | "plain";

export const DEFAULT_AUTH_URL = "https://auth.mn";
export const DEFAULT_API_URL = "https://api.auth.mn";
export const DEFAULT_SOCKET_PATH = "/main/v1/socket/connector";

export const LABELS: Record<AuthMnButtonType, string> = {
  signin: "Auth.mn-ээр нэвтрэх",
  continue: "Auth.mn-ээр үргэлжлүүлэх",
  login: "Auth.mn нэвтрэлт",
  plain: "Auth.mn"
};

export interface AuthMnBaseButtonProps {
  theme?: AuthMnTheme;
  size?: AuthMnSize;
  /** px — default 10 */
  radius?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AuthMnButtonProps extends AuthMnBaseButtonProps {
  /** Auth.mn frontend хаяг (default https://auth.mn) */
  authUrl?: string;
  /**
   * Нэвтэрсний дараа буцах URL. Default: одоогийн хуудас (query-гүй).
   * Auth.mn энэ хаяг руу `?authToken=<token>` залгаж буцаана.
   */
  redirectUrl?: string;
  buttonType?: AuthMnButtonType;
  /** buttonType-ийн оронд өөрийн текст */
  label?: string;
  /** Өгвөл default redirect-ийн оронд энэ дуудагдана */
  onClick?: () => void;
  /**
   * Товчны баруун талд харагдах 3rd party лого — Auth.mn-ээр эдгээрээр нэвтэрч болдгийг ойлгуулна.
   * Default: ["google","facebook","steam"]. [] өгвөл нуугдана.
   */
  providers?: ("google" | "facebook" | "steam" | "apple")[];
}

export interface AuthMnQrButtonProps extends AuthMnBaseButtonProps {
  /** Auth.mn API хаяг (default https://api.auth.mn) — socket энд холбогдоно */
  apiUrl?: string;
  /** socket.io path (default /main/v1/socket/connector) */
  socketPath?: string;
  /** Auth.mn аппын QR-ийг уншихад харагдах тайлбар (сайтын нэр) */
  desc?: string;
  /** QR-д кодлох утга. Default: `${authUrl}/qr-login?uuid=<uuid>` */
  qrValue?: (uuid: string) => string;
  authUrl?: string;
  /** Апп дээр зөвшөөрсний дараа token ирнэ */
  onSuccess: (token: string) => void;
  onError?: (message: string) => void;
  /** QR-ийн хүчинтэй хугацаа (сек), default 300 */
  expiresIn?: number;
  /** button: товч → modal; inline: QR-ийг шууд харуулна (дарвал томруулна) */
  display?: "button" | "inline";
  /** inline үед QR-ийн хэмжээ px (default 96) */
  qrSize?: number;
  /** Зөвхөн QR дүрстэй жижиг товч */
  iconOnly?: boolean;
  label?: string;
  /** Modal-ийн гарчиг */
  title?: string;
}
