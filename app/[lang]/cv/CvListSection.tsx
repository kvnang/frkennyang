import { Accordions } from "./Accordions";

export async function CvListSection() {
  const { cvList } = await import("./cvList");

  return (
    <section className="container pb-section">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
          <Accordions cvList={cvList} />
        </div>
      </div>
    </section>
  );
}
