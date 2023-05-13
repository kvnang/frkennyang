import { InstagramIcon, YoutubeIcon } from "./SocialIcons";

type SocialProps = {
  dark?: boolean;
  className?: string;
};

export default function Social({ dark, className = "" }: SocialProps) {
  return (
    <div
      className={`flex ${
        className.split(" ").includes("static")
          ? ""
          : "absolute right-0 bottom-page px-4 py-2"
      } ${className}`}
    >
      <ul className="flex flex-wrap items-center justify-start -m-3.5 md:flex-col md:justify-center">
        <li className="p-3.5">
          <a
            href="https://www.youtube.com/channel/UCcjDuwzBBR7pvcuRjlJi48A"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center transition-colors hover:text-accent focus:text-accent ${
              dark ? "text-darker-gray" : "text-white"
            }`}
          >
            <YoutubeIcon className="h-5 w-5" />
          </a>
        </li>
        <li className="p-3.5">
          <a
            href="https://www.instagram.com/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center transition-colors hover:text-accent focus:text-accent ${
              dark ? "text-darker-gray" : "text-white"
            }`}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </li>
      </ul>
    </div>
  );
}
