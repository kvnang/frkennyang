import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export function getLocale(request: Request) {
  const headers = request.headers;
  const negotiatorHeaders = {
    "accept-language": headers.get("accept-language") || "",
  };

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = ["en", "id"];
  const defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}
