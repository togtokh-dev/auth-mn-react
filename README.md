# auth-mn-react

**Sign in with Auth.mn** — Google Pay / Sign in with Google шиг бүх project дээр нэг л component.
Tailwind, HeroUI зэргээс хамааралгүй (CSS-ээ өөрөө inject хийнэ). Next.js App Router, Vite аль алинд ажиллана.

```bash
npm i auth-mn-react
```

## 1. Redirect + QR нэг мөрөнд (санал болгох)

```tsx
import { AuthMnLoginRow, useAuthMnCallback } from "auth-mn-react";

function LoginPage() {
  // auth.mn-ээс ?authToken= буцаж ирэхэд нэг удаа дуудагдана
  useAuthMnCallback((token) => loginWithToken(token));

  return (
    <AuthMnLoginRow
      qr={{ desc: "mashin.center", onSuccess: (token) => loginWithToken(token) }}
    />
  );
}
```

`[ Auth.mn-ээр нэвтрэх (8/12) ] [ QR-аар нэвтрэх (4/12) ]` — mobile дээр босоо болно.

## 2. Тус тусад нь

```tsx
<AuthMnButton theme="dark" size="lg" buttonType="continue" />
<AuthMnButton theme="light" buttonType="plain" />          // зөвхөн лого + Auth.mn
<AuthMnButton redirectUrl="https://my.site/login" />

<AuthMnQrButton onSuccess={(t) => loginWithToken(t)} iconOnly />
```

| Prop | Утга |
|---|---|
| `theme` | `dark` (default) · `light` · `outline` |
| `size` | `sm` 36px · `md` 44px · `lg` 52px |
| `buttonType` | `signin` · `continue` · `login` · `plain` |
| `radius` | px, default 10 |
| `authUrl` / `apiUrl` | default `https://auth.mn` / `https://api.auth.mn` (staging бол сольж өгнө) |

## Урсгал

- **Redirect**: `auth.mn/login?redirect=<таны хуудас>` → нэвтэрсний дараа `<таны хуудас>?authToken=…` буцна → `useAuthMnCallback` барина.
  Хэрэглэгч auth.mn дээр аль хэдийн нэвтэрсэн бол зөвшөөрлийн дэлгэц (consent) гарна.
- **QR**: socket (`/main/v1/socket/connector`) → `login-qr` → QR → Auth.mn аппаар уншуулж зөвшөөрөх → `login-qr-success` → `onSuccess(token)`.

Token-оо `GET https://api.auth.mn/main/v1/auth/user/verify_token` (Bearer) дуудаж баталгаажуулаад хэрэглэгчийн мэдээллээ авна.
