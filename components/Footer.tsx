import React from "react";
import Menu from "./Menu";
import { LangType } from "@/types";

export default function Footer({ params }: { params: { lang: LangType } }) {
  return (
    <footer>
      <div className="container">
        <div className="py-6 border-t border-t-dark-gray">
          <Menu isFooter params={params} />
        </div>
      </div>
    </footer>
  );
}
