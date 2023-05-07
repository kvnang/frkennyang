import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main>
      <section className="container pt-page pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full lg:col-span-8 lg:col-start-2 xl:col-span-6 xl:col-start-2">
            <h1>404 Page Not Found</h1>
            <p>
              The page you are looking for does not exist. It may have been
              moved, or removed altogether. Perhaps you can return back to the
              site’s homepage and see if you can find what you are looking for.
            </p>
            <Link href="/" className="button">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
