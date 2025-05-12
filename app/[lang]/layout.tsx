import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Montserrat, Inter, DM_Serif_Display } from "next/font/google";
import type { LangType } from "@/types";
import { defaultMetadata } from "@/lib/metadata";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

import "@/styles/globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-serif-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

export const metadata = defaultMetadata;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default async function RootLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: LangType }>;
}) {
  const params = await _params;
  const { lang } = params;
  return (
    <html
      lang={lang}
      className={`${montserrat.variable} ${dmSerifDisplay.variable} ${inter.variable}`}
    >
      <head>
        <Script
          strategy="lazyOnload"
          key="cf-analytics"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5e4d44f2777e44d184490c0732ba7473"}'
        />
      </head>
      <body className="font-sans antialiased text-body bg-bg">
        <div className="bg-bg flex flex-col min-h-screen">
          <Header params={params} />
          <div className="flex-1">{children}</div>
          <Footer params={params} />
        </div>
        <Toaster
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
