// Tailwind/UI library-с хамааралгүй, нэг удаа <head>-д inject хийгддэг CSS.
// "Sign in with Google" / Google Pay товчны хэмжээ, зай, төлвүүдийг дууриасан.

const STYLE_ID = "auth-mn-react-styles";

export const CSS = `
.amr-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"SF Pro Display",Inter,sans-serif;font-weight:600;
  letter-spacing:-.01em;line-height:1;cursor:pointer;user-select:none;white-space:nowrap;border:1px solid transparent;
  transition:background .15s,box-shadow .15s,transform .05s,border-color .15s,opacity .15s;text-decoration:none;outline:none;
  min-width:0}
.amr-btn:active{transform:scale(.985)}
.amr-btn:focus-visible{box-shadow:0 0 0 3px rgba(59,130,246,.45)}
.amr-btn[disabled],.amr-btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed;transform:none}
.amr-btn--full{width:100%;display:flex}
.amr-btn--sm{height:38px;padding:0 14px;font-size:13px;gap:8px}
.amr-btn--md{height:46px;padding:0 18px;font-size:14px}
.amr-btn--lg{height:54px;padding:0 22px;font-size:15px}
.amr-btn--icon{padding:0!important;gap:0;flex:none}
.amr-btn--sm.amr-btn--icon{width:38px}
.amr-btn--md.amr-btn--icon{width:46px}
.amr-btn--lg.amr-btn--icon{width:54px}
.amr-btn--dark{background:#000;color:#fff;border-color:#000}
.amr-btn--dark:hover{background:#111}
.amr-btn--light{background:#fff;color:#000;border-color:#e3e5e8;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.amr-btn--light:hover{background:#f7f8fa;border-color:#d5d8dc}
.amr-btn--outline{background:transparent;color:inherit;border-color:rgba(127,127,127,.45)}
.amr-btn--outline:hover{border-color:currentColor;background:rgba(127,127,127,.08)}
.amr-btn__logo{flex:none;display:inline-flex;align-items:center;justify-content:center}
.amr-btn__label{overflow:hidden;text-overflow:ellipsis}
.amr-btn__brand{font-weight:700}
.amr-btn--providers{justify-content:flex-start}
.amr-btn--providers .amr-btn__label{flex:1;text-align:center}
.amr-btn__providers{flex:none;display:inline-flex;align-items:center;gap:7px;padding-left:12px;margin-left:2px;
  border-left:1px solid rgba(127,127,127,.35);opacity:.92;line-height:0}
.amr-btn--sm .amr-btn__providers{gap:5px;padding-left:8px}
.amr-btn--icon .amr-btn__providers{display:none}

.amr-row{display:flex;gap:10px;width:100%;align-items:stretch}
.amr-row>.amr-row__main{flex:1 1 0;min-width:0}
.amr-row>.amr-row__side{flex:0 0 auto}
.amr-row>.amr-row__side .amr-btn:not(.amr-btn--icon){width:100%}
@media (max-width:400px){.amr-row{flex-direction:column}.amr-row>.amr-row__side{flex:1 1 auto}}
.amr-row--icon{flex-direction:row!important}
.amr-row--icon>.amr-row__side .amr-btn{height:100%}
.amr-row--icon>.amr-row__side{flex:0 0 auto}
.amr-row--inline{align-items:stretch}
.amr-row--inline>.amr-row__stack{display:flex;flex-direction:column;justify-content:center;gap:8px;min-width:0}
.amr-row__hint{font-size:11.5px;opacity:.6;text-align:center;line-height:1.35}
.amr-row--inline>.amr-row__side{display:flex;align-items:center}
.amr-qr-inline{position:relative;display:flex;align-items:center;justify-content:center;flex:none;padding:6px;box-sizing:border-box;
  background:#fff;border:1px solid rgba(127,127,127,.35);cursor:zoom-in;overflow:hidden;transition:box-shadow .15s,border-color .15s}
.amr-qr-inline:hover{border-color:currentColor;box-shadow:0 2px 10px rgba(0,0,0,.15)}
.amr-qr-inline[disabled]{opacity:.55;cursor:not-allowed}
.amr-qr-inline .amr-qr__mask{border-radius:0;font-size:11px;gap:4px;padding:6px}
.amr-qr-inline .amr-spinner{width:18px;height:18px}
.amr-qr-inline .amr-link{font-size:11px}

.amr-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;
  background:rgba(0,0,0,.6);backdrop-filter:blur(6px);animation:amr-fade .15s ease-out}
.amr-modal{position:relative;width:100%;max-width:360px;border-radius:24px;background:#fff;color:#0b0e1a;
  box-shadow:0 24px 64px rgba(0,0,0,.45);padding:22px 22px 18px;box-sizing:border-box;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"SF Pro Display",Inter,sans-serif;animation:amr-pop .18s ease-out}
.amr-modal__close{position:absolute;top:14px;right:14px;width:32px;height:32px;border:0;border-radius:10px;background:#f1f3f5;
  color:#5f6368;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}
.amr-modal__close:hover{background:#e6e8eb;color:#000}
.amr-modal__head{display:flex;align-items:center;gap:12px;margin-bottom:18px;padding-right:36px}
.amr-modal__title{font-size:16px;font-weight:700;margin:0;letter-spacing:-.01em}
.amr-modal__sub{font-size:12.5px;color:#5f6368;margin:3px 0 0}
.amr-qr{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;width:100%;
  border-radius:18px;border:1px solid #e6e8eb;background:#fff;padding:18px;box-sizing:border-box}
.amr-qr svg{display:block}
.amr-qr__mask{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
  border-radius:18px;background:rgba(255,255,255,.94);font-size:13px;color:#5f6368;text-align:center;padding:16px}
.amr-qr__mask.amr-qr__mask--ok{color:#16a34a;font-weight:600}
.amr-qr__mask.amr-qr__mask--bad{color:#dc2626;font-weight:600}
.amr-spinner{width:22px;height:22px;border-radius:50%;border:2.5px solid #e3e5e8;border-top-color:#000;animation:amr-spin .8s linear infinite}
.amr-steps{margin:14px 0 0;padding:12px 14px;list-style:none;display:flex;flex-direction:column;gap:9px;font-size:12.5px;color:#3c4043;
  background:#f6f7f9;border-radius:14px}
.amr-steps li{display:flex;gap:10px;align-items:flex-start;line-height:1.45}
.amr-steps li span{flex:1;min-width:0}
.amr-steps strong{color:#0b0e1a;font-weight:600}
.amr-steps b{flex:none;width:18px;height:18px;border-radius:50%;background:#000;color:#fff;font-size:11px;font-weight:600;
  display:inline-flex;align-items:center;justify-content:center;margin-top:1px}
.amr-modal__foot{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding:0 2px;font-size:12px;color:#5f6368;min-height:16px;font-variant-numeric:tabular-nums}
.amr-link{background:none;border:0;padding:0;color:#2563eb;cursor:pointer;font:inherit;font-size:12px;font-weight:600}
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
