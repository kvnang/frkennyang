import * as React from "react";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "./SocialIcons";

interface Props {
  title?: string;
  url: string;
  label?: string;
}

export default function SocialShare({ title, url, label }: Props) {
  return (
    <div>
      {label && (
        <div className="text-base font-semibold mb-4 hidden lg:block">
          {label}
        </div>
      )}
      <div>
        <ul className="flex flex-wrap -m-2">
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="p-2 inline-flex items-center justify-center transition-colors hover:text-accent"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a
              href={`http://twitter.com/share?text=${encodeURIComponent(
                title || ""
              )}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              className="p-2 inline-flex items-center justify-center transition-colors hover:text-accent"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="p-2 inline-flex items-center justify-center transition-colors hover:text-accent"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="p-2 inline-flex items-center justify-center transition-colors hover:text-accent"
            >
              <WhatsappIcon className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
