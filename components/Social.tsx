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
  className?: string;
};

export default function Social({ dark, className = '' }: SocialProps) {
  return (
    <div
      className={`flex ${
        className.split(' ').includes('static')
          ? ''
          : 'absolute right-0 bottom-page px-4 py-2'
      } ${className}`}
    >
      <ul className="flex flex-wrap items-center justify-start -m-3.5 md:flex-col md:justify-center">
        <li className="p-3.5">
          <a
            href="https://www.youtube.com/channel/UCcjDuwzBBR7pvcuRjlJi48A"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center transition-colors hover:text-accent focus:text-accent ${
              dark ? 'text-black' : 'text-white'
            }`}
          >
            <FaYoutube className="h-5 w-5" title="YouTube" />
          </a>
        </li>
        <li className="p-3.5">
          <a
            href="https://www.instagram.com/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center transition-colors hover:text-accent focus:text-accent ${
              dark ? 'text-black' : 'text-white'
            }`}
          >
            <FaInstagram className="h-5 w-5" title="Instagram" />
          </a>
        </li>
      </ul>
    </div>
  );
}
