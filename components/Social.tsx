import { cn } from "@/utils/helpers";

type SocialProps = {
  dark?: boolean;
  className?: string;
};

const SOCIAL = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCcjDuwzBBR7pvcuRjlJi48A",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24">
        <title>YouTube</title>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Academia",
    href: "https://actaphilosophica.academia.edu/KennyAng",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Academia</title>
        <path d="M22.033 21.18L13.77.459H7.869l1.049 2.623L1.836 21.18C1.574 22.098.787 22.23 0 22.361v1.18h6.82v-1.18C4.984 22.23 3.934 21.967 4.721 20c.131-.131.656-1.574 1.311-3.41h8.393l1.18 3.016c.131.525.262.918.262 1.311 0 1.049-.918 1.443-2.623 1.443v1.18H24v-1.18c-.918-.13-1.705-.393-1.967-1.18zM6.82 14.361a363.303 363.303 0 0 0 3.279-8.525l3.41 8.525H6.82z" />
      </svg>
    ),
  },
];

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
        {SOCIAL.map((social) => {
          return (
            <li key={social.name} className="p-3.5">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  `flex items-center justify-center transition-colors hover:text-accent focus:text-accent`,
                  "[&>svg]:size-5 [&>svg]:fill-current",
                  dark ? "text-darker-gray" : "text-white",
                )}
              >
                {social.icon}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
