/**
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
type TurnstileErrorCode =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "unknown-error"
  | "timeout-or-duplicate"
  | "internal-error";

/**
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
interface TurnstileResponse {
  /** Whether the validation is successful or not. */
  success: boolean;
  /** The ISO timestamp for the time the challenge was solved. */
  challenge_ts: string;
  /** The hostname for which the challenge was served. */
  hostname: string;
  "error-codes": TurnstileErrorCode[] | [];
  /** The customer widget identifier passed to the widget on the client side. This is used to differentiate widgets using the same sitekey in analytics. Its integrity is protected by modifications from an attacker. It is recommended to validate that the action matches an expected value. */
  action: string;
  /** The customer data passed to the widget on the client side. This can be used by the customer to convey state. It is integrity protected by modifications from an attacker. */
  cdata: string;
}

const TEST_SECRET_KEY_PASS = "1x0000000000000000000000000000000AA";
const TEST_SECRET_KEY_FAIL = "2x0000000000000000000000000000000AA";
const TEST_SECRET_KEY_ERROR = "3x0000000000000000000000000000000AA"; // Yields a “token already spent” error

export const turnstileVerify = async (
  request: Request,
  token?: string | null
) => {
  // Turnstile injects a token in "cf-turnstile-response".
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip");

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  const turnstileFormData = {
    secret: process.env.TURNSTILE_SECRET_KEY || "",
    response: token || "",
    remoteip: ip || "",
  };

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(turnstileFormData).toString(),
    method: "POST",
  });

  const outcome = (await result.json()) as TurnstileResponse;

  return outcome;
};
