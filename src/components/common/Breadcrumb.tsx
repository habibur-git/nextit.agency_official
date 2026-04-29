export default function Breadcrumb({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const renderTitle = () => {
    const parts = title.split(/(\*\*.*?\*\*)/g).filter(Boolean);

    return parts.map((part, index) => {
      const isBold = part.startsWith("**") && part.endsWith("**");
      const content = isBold ? part.slice(2, -2) : part;
      const previousPart = parts[index - 1];
      const shouldBreakLine =
        !isBold &&
        previousPart?.startsWith("**") &&
        previousPart?.endsWith("**");

      if (isBold) {
        return (
          <strong
            key={`title-part-${index}`}
            className="font-title text-white text-[44px] md:text-[72px] lg:text-[120px] font-semi-bold tracking-tight leading-[120%] capitalize"
          >
            {content}
          </strong>
        );
      }

      return (
        <span
          key={`title-part-${index}`}
          className="font-title text-white text-[44px] md:text-[72px] lg:text-[120px] font-semi-bold tracking-tight leading-[120%] capitalize"
        >
          {shouldBreakLine ? <br /> : null}
          {content}
        </span>
      );
    });
  };

  return (
    <section className="relative w-full overflow-hidden py-16 pt-46 h-full">
      <div className="container">
        <h1>{renderTitle()}</h1>
        <p className="text-[22px] font-title mt-6">{description}</p>
      </div>
    </section>
  );
}
