// Tailwind/UI library-с хамааралгүй, нэг удаа <head>-д inject хийгддэг CSS.
// Google Pay / Sign in with Google товчны хэмжээ, зайг дууриасан.

const STYLE_ID = "auth-mn-react-styles";

export const CSS = `
.amr-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;
  font-family:inherit;font-weight:600;letter-spacing:-.01em;line-height:1;cursor:pointer;user-select:none;white-space:nowrap;
  border:1px solid transparent;transition:background .15s,box-shadow .15s,transform .05s,border-color .15s;text-decoration:none;outline:none}
.amr-btn:active{transform:scale(.985)}
.amr-btn:focus-visible{box-shadow:0 0 0 3px rgba(26,115,232,.35)}
.amr-btn[disabled],.amr-btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed;transform:none}
.amr-btn--full{width:100%;display:flex}
.amr-btn--sm{height:36px;padding:0 14px;font-size:13px}
.amr-btn--md{height:44px;padding:0 18px;font-size:14px}
.amr-btn--lg{height:52px;padding:0 22px;font-size:15px}
.amr-btn--icon.amr-btn--sm{width:36px;padding:0}
.amr-btn--icon.amr-btn--md{width:44px;padding:0}
.amr-btn--icon.amr-btn--lg{width:52px;padding:0}
.amr-btn--dark{background:#0b1220;color:#fff;border-color:#0b1220}
.amr-btn--dark:hover{background:#1a2333}
.amr-btn--light{background:#fff;color:#0b1220;border-color:#dadce0}
.amr-btn--light:hover{background:#f6f7f9}
.amr-btn--outline{background:transparent;color:inherit;border-color:currentColor;opacity:.9}
.amr-btn--outline:hover{opacity:1;background:rgba(127,127,127,.08)}
.amr-btn__logo{flex:none;display:inline-flex}
.amr-btn__brand{font-weight:700}

.amr-row{display:flex;gap:10px;width:100%}
.amr-row>.amr-row__main{flex:2 1 0;min-width:0}
.amr-row>.amr-row__side{flex:1 1 0;min-width:0}
@media (max-width:420px){.amr-row{flex-direction:column}}

.amr-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;
  background:rgba(8,12,20,.55);backdrop-filter:blur(4px);animation:amr-fade .15s ease-out}
.amr-modal{position:relative;width:100%;max-width:380px;border-radius:20px;background:#fff;color:#0b1220;
  box-shadow:0 24px 64px rgba(0,0,0,.35);padding:24px;box-sizing:border-box;font-family:inherit;animation:amr-pop .18s ease-out}
.amr-modal__close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:0;border-radius:10px;background:#f1f3f5;
  color:#5f6368;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}
.amr-modal__close:hover{background:#e6e8eb;color:#0b1220}
.amr-modal__head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.amr-modal__title{font-size:16px;font-weight:700;margin:0}
.amr-modal__sub{font-size:12.5px;color:#5f6368;margin:2px 0 0}
.amr-qr{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;width:100%;
  border-radius:16px;border:1px solid #e6e8eb;background:#fff;padding:18px;box-sizing:border-box}
.amr-qr__mask{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
  border-radius:16px;background:rgba(255,255,255,.92);font-size:13px;color:#5f6368}
.amr-qr__mask.amr-qr__mask--ok{color:#1e8e3e}
.amr-spinner{width:22px;height:22px;border-radius:50%;border:2.5px solid #dadce0;border-top-color:#0b1220;animation:amr-spin .8s linear infinite}
.amr-steps{margin:16px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;font-size:12.5px;color:#3c4043}
.amr-steps li{display:flex;gap:8px;align-items:flex-start}
.amr-steps b{flex:none;width:18px;height:18px;border-radius:50%;background:#0b1220;color:#fff;font-size:11px;
  display:inline-flex;align-items:center;justify-content:center}
.amr-modal__foot{display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-size:12px;color:#5f6368}
.amr-link{background:none;border:0;padding:0;color:#1a73e8;cursor:pointer;font:inherit;font-size:12px}
.amr-link:hover{text-decoration:underline}
@keyframes amr-spin{to{transform:rotate(360deg)}}
@keyframes amr-fade{from{opacity:0}to{opacity:1}}
@keyframes amr-pop{from{opacity:0;transform:scale(.96) translateY(6px)}to{opacity:1;transform:none}}
`;

let injected = false;

/** CSS-ийг document head-д нэг л удаа оруулна (SSR үед юу ч хийхгүй) */
export function ensureStyles(): void {
  if (injected || typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) {
    injected = true;
    return;
  }
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}
