"use client";

import { useTurnstile } from "@/hooks/useTurnstile";

export function Turnstile({ loading }: { loading?: boolean }) {
  const { turnstileRef, turnstileInputRef } = useTurnstile();

  return (
    <div>
      <div
        ref={turnstileRef}
        className={`transition-opacity bg-dark-gray ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
        style={{ width: 300, height: 65 }}
      />
      <input
        ref={turnstileInputRef}
        type="hidden"
        name="cf-turnstile-response"
      />
    </div>
  );
}
