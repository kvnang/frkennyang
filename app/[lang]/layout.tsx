import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Playfair_Display, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/main.scss";
import type { LangType } from "@/types";

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

export const metadata = {
  title: "Fr. Kenny Ang",
  description: `Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America.`,
};

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
        <div className="">
          <div className="bg-bg flex flex-col min-h-screen">
            <Header params={params} />
            <div className="flex-1">{children}</div>
            <Footer params={params} />
          </div>
        </div>
      </body>
    </html>
  );
}
