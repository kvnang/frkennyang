import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export function getLocale(request: Request) {
  const headers = request.headers;
  const negotiatorHeaders = {
    "accept-language": headers.get("accept-language") || "",
  };

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locales = ["en", "id"];
  let defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}
