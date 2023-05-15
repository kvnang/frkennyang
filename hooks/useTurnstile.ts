import * as React from "react";

declare global {
  interface Window {
    turnstile: any;
    onloadTurnstileCallback: () => void;
  }
}

const TEST_SITE_KEY_PASS = "1x00000000000000000000AA";
const TEST_SITE_KEY_BLOCK = "2x00000000000000000000AB";
const TEST_SITE_KEY_CHALLENGE = "3x00000000000000000000FF";

export function useTurnstile() {
  const turnstileRef = React.useRef<HTMLDivElement>(null);
  const turnstileInputRef = React.useRef<HTMLInputElement>(null);

  const renderTurnstile = (el: HTMLElement) => {
    if (typeof window.turnstile !== "undefined") {
      if (el.dataset.widget) {
        window.turnstile.reset(el.dataset.widget);
      }

      const widget = window.turnstile.render(el, {
        sitekey: `${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`,
        callback: (token: string) => {
          if (turnstileInputRef.current) {
            turnstileInputRef.current.value = token;
          }
        },
      });

      el.setAttribute("data-widget", widget);
    }
  };

  React.useEffect(() => {
    const el = turnstileRef.current;

    if (!el) return;

    if (typeof window.onloadTurnstileCallback !== "function") {
      window.onloadTurnstileCallback = () => {
        if (!el.dataset.widget) {
          renderTurnstile(el);
        }
      };
    }

    if (!document.querySelector("#turnstile-script")) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    renderTurnstile(el);
  }, [turnstileRef]);

  return { turnstileRef, turnstileInputRef };
}
