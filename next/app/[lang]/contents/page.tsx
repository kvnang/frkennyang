import { Contents } from './Contents';

export default function ContentsPage() {
  // const { lang } = useContext(LangContext);
  const lang = 'en';

  return (
    <main>
      <Contents />
    </main>
  );
}

// export function Head({ location: { pathname } }: HeadProps) {
//   return (
//     <SEO
//       title="Contents"
//       description="Browse Fr. Kenny's latest works, available in both English and Bahasa Indonesia."
//       pathname={pathname}
//     />
//   );
// }
