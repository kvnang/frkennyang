import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

interface Props {
  title?: string;
  url: string;
  label?: string;
}

export default function SocialShare({ title, url, label }: Props) {
  return (
    <div>
      {label && <div className="text-base font-semibold mb-4">{label}</div>}
      <div>
        <ul className="flex flex-wrap -m-2">
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="p-2 inline-flex items-center justify-center"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              href={`http://twitter.com/share?text=${title}&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              className="p-2 inline-flex items-center justify-center"
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="p-2 inline-flex items-center justify-center"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/?text=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="p-2 inline-flex items-center justify-center"
            >
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
