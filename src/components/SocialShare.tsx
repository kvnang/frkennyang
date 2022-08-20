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
    <div className="post-share">
      {label && <span className="label small">{label}</span>}
      <div className="list-wrapper">
        <ul>
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
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
            >
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
