import { PortableText } from "next-sanity";
import Link from "next/link";

export function CvPortableText(
  props: React.ComponentProps<typeof PortableText>,
) {
  return (
    <PortableText
      {...props}
      components={{
        ...props.components,
        marks: {
          link: ({ text, value }) => {
            const href = value.href;
            if (!href) return null;

            const isExternal = href.startsWith("http");
            const target = isExternal ? "_blank" : "_self";
            const rel = isExternal ? "noopener noreferrer" : "";
            return (
              <Link href={href} target={target} rel={rel}>
                {text}
              </Link>
            );
          },
        },
        ...props.components?.marks,
      }}
    ></PortableText>
  );
}
