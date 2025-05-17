"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { LangType } from "@/types";

interface MenuListStylesProps {
  isMobile?: boolean;
  isFooter?: boolean;
}

const menuItems = [
  {
    link: "/about",
    title: "About",
  },
  {
    link: "/cv",
    title: "Curriculum Vitae",
    titleShort: "CV",
  },
  {
    link: "/blog",
    title: "Blog",
    titleShort: "Blog",
  },
  {
    link: "/invite",
    title: "Invite to Speak",
    titleShort: "Invite",
  },
  {
    link: "/#contact",
    title: "Contact",
  },
];

interface Props extends MenuListStylesProps {
  setMobileMenuActive?: (v: boolean) => void;
  params: { lang: LangType };
}

export default function Menu({
  setMobileMenuActive,
  isMobile = false,
  isFooter = false,
  params,
}: Props) {
  const pathname = usePathname();
  const [hovered, setHovered] = React.useState("");
  return (
    <LayoutGroup
      id={`${isMobile ? "menu-mobile" : isFooter ? "menu-footer" : "menu"}`}
    >
      <ul
        className={`flex justify-end ${
          isMobile ? "max-lg:justify-start max-lg:flex-col" : ""
        } ${isFooter ? "max-lg:justify-center text-sm" : ""}`}
        style={{
          margin: "calc(var(--menu-gap-v) * -1) calc(var(--menu-gap) * -1)",
        }}
      >
        {menuItems.map((menuItem, i) => {
          const href = `/${params.lang}${menuItem.link}`;
          return (
            <li key={`menu-${i}`} style={{ padding: "var(--menu-gap-v) 0" }}>
              <Link
                href={href}
                className="whitespace-nowrap opacity-60 hover:opacity-100 aria-[current=page]:opacity-100 transition-opacity"
                onClick={() => {
                  setHovered(href);
                  if (typeof setMobileMenuActive !== "undefined") {
                    setMobileMenuActive(false);
                  }
                }}
                onMouseOver={() => setHovered(href)}
                onMouseOut={() => setHovered("")}
                aria-current={pathname === href ? "page" : undefined}
                style={{ padding: "0 var(--menu-gap)" }}
              >
                <div className="relative inline-flex py-1.5">
                  {isFooter
                    ? menuItem.titleShort || menuItem.title
                    : menuItem.title}
                  {(hovered === href || (!hovered && pathname === href)) && (
                    <motion.div
                      layoutId={`menu-underline`}
                      className="absolute bottom-0 left-0 border-t border-t-white w-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}
