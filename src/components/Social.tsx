import React from 'react';
import {
  // FaFacebookF,
  // FaLinkedinIn,
  // FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

type SocialProps = {
  dark?: boolean;
};

export default function Social({ dark }: SocialProps) {
  return (
    <div className={`social-list ${dark === true ? 'social dark' : 'social'}`}>
      <ul>
        <li>
          <a
            href="https://www.youtube.com/channel/UCcjDuwzBBR7pvcuRjlJi48A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube title="YouTube" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram title="Instagram" />
          </a>
        </li>
      </ul>
    </div>
  );
}
