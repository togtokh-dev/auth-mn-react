import { useEffect, useRef } from "react";

/**
 * Auth.mn redirect-ээс `?authToken=` -тэй буцаж ирэхэд нэг удаа onToken-ыг дуудаад
 * URL-аас параметрийг цэвэрлэнэ. Next.js / Vite аль алинд ажиллана.
 *
 *   useAuthMnCallback((token) => loginWithToken(token));
 */
export function useAuthMnCallback(
  onToken: (token: string) => void | Promise<void>,
  opts?: { param?: string; cleanUrl?: boolean }
): void {
  const handled = useRef(false);
  const param = opts?.param || "authToken";
  const cleanUrl = opts?.cleanUrl ?? true;

  useEffect(() => {
    if (handled.current || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const token = url.searchParams.get(param);
    if (!token) return;
    handled.current = true;

    if (cleanUrl) {
      url.searchParams.delete(param);
      window.history.replaceState({}, "", url.pathname + (url.search || "") + url.hash);
    }
    void onToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
