import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import type { LangType } from "@/types";
import { defaultMetadata } from "@/lib/metadata";
import { Toaster } from "react-hot-toast";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = defaultMetadata;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: LangType };
}) {
  return (
    <html
      lang={params.lang}
      className={`${montserrat.variable} ${playfairDisplay.variable}`}
    >
      <head>
        {/* <script
          key="cf-analytics"
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5e4d44f2777e44d184490c0732ba7473"}'
        /> */}
      </head>
      <body className="font-sans antialiased text-body bg-bg">
        <div className="bg-bg flex flex-col min-h-screen">
          <Header params={params} />
          <div className="flex-1">{children}</div>
          <Footer params={params} />
        </div>
        <Toaster toastOptions={{}} />
      </body>
    </html>
  );
}
