"use client";

import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IndonesiaFlag, UsFlag } from "./Flags";

const removeTrailingSlash = (str: string) =>
  str.endsWith("/") ? str.slice(0, -1) : str;

export function LanguageSwitcherInner({
  params,
}: {
  params: { lang: string };
}) {
  const pathname = usePathname();

  // Remove locale from pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(en|id)/, "");

  return (
    <Menu className="relative" as="div">
      <Menu.Button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-medium-gray transition-colors">
        <GlobeAltIcon className="w-6 h-6" title="Change Language" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute z-20 top-full right-0 flex flex-col bg-dark-gray rounded-md text-sm shadow-md overflow-hidden py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                className={clsx(
                  `flex items-center px-4 py-2 whitespace-nowrap transition-colors`,
                  active ? "bg-medium-gray" : ""
                )}
                href={
                  pathnameWithoutLocale ? `/en/${pathnameWithoutLocale}` : `/en`
                }
              >
                <div className="mr-2 shrink-0 rounded-full">
                  <UsFlag className="w-4 h-4 rounded-full" />
                </div>
                <span
                  className={clsx(
                    active || params.lang === "en"
                      ? "opacity-100"
                      : "opacity-80",
                    params.lang === "en" ? "font-bold" : ""
                  )}
                >
                  English
                </span>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`flex items-center px-4 py-2 whitespace-nowrap transition-colors ${
                  active ? "bg-medium-gray" : ""
                }`}
                href={
                  pathnameWithoutLocale ? `/id/${pathnameWithoutLocale}` : `/id`
                }
              >
                <div className="mr-2 shrink-0 rounded-full">
                  <IndonesiaFlag className="w-4 h-4 rounded-full" />
                </div>
                <span
                  className={clsx(
                    active || params.lang === "id"
                      ? "opacity-100"
                      : "opacity-80",
                    params.lang === "id" ? "font-bold" : ""
                  )}
                >
                  Bahasa Indonesia
                </span>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function LanguageSwitcher({ params }: { params: { lang: string } }) {
  return (
    <React.Suspense fallback={null}>
      <LanguageSwitcherInner params={params} />
    </React.Suspense>
  );
}
