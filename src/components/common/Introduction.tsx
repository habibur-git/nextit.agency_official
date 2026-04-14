const INTRO_PRIMARY =
  "We are a creative studio that specializes in providing high-quality design and branding solutions to businesses and individuals.";

const INTRO_SECONDARY =
  "Our team is composed of talented designers, developers, and marketers.";

const SERVICES_A = [
  "Art direction",
  "Branding",
  "Content Production",
  "User Interface Design",
  "Animation",
];

const SERVICES_B = [
  "Brand Identity",
  "User Interface",
  "User Experience",
  "Responsive Design",
];

function SquiggleArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 18 C38 8 52 42 28 58 C8 72 4 102 32 118 C58 132 72 108 88 96 C104 84 118 78 128 92"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118 88 L128 92 L124 104"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-4 md:gap-5">
      {items.map((label) => (
        <li key={label} className="flex items-start gap-3.5">
          <span className="mt-2 h-2 w-2 shrink-0 bg-white/35" aria-hidden />
          <span className="font-body text-[15px] leading-snug text-white/90 md:text-base">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Introduction() {
  return (
    <section className="w-full py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        {/* Top: two-column intro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="w-fit -rotate-6 rounded-sm bg-[#2a2a2a] px-4 py-2.5 shadow-lg shadow-black/40">
              <span className="font-title text-sm font-medium tracking-wide text-white md:text-base">
                👋 Hi!
              </span>
            </div>
            <p className="font-title text-[1.65rem] font-light leading-[1.35] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-tight">
              {INTRO_PRIMARY}
            </p>
          </div>
          <div className="flex flex-col justify-end lg:pt-14">
            <p className="font-title text-[1.65rem] font-light leading-[1.35] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-tight">
              {INTRO_SECONDARY}
            </p>
          </div>
        </div>

        {/* Bottom: label + arrow | services | services */}
        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-white/10 pt-16 md:mt-24 md:grid-cols-12 md:gap-10 md:pt-20 lg:mt-28 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="font-title text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
              Something
            </p>
            <p className="mt-2 font-title text-2xl font-medium uppercase leading-none tracking-wide text-white md:text-3xl lg:text-4xl">
              What I do
            </p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 md:pl-2">
            <ServiceList items={SERVICES_A} />
          </div>
          <div className="md:col-span-4 lg:col-span-4 md:pl-2">
            <ServiceList items={SERVICES_B} />
          </div>
        </div>
      </div>
    </section>
  );
}
