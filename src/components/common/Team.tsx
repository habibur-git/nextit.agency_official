import { teamData } from "@/data/team";
import Image from "next/image";
import { ModuleTitle } from "./ModuleTitle";

export default function Team() {
  return (
    <section className="space ">
      <div className="container">
        <ModuleTitle
          suppertitle="NextIT Team"
          title="Meet the team **behind the work.**"
          subtitle="Senior designers and engineers who work as an extension of your team — not as an outsider agency."
          variant="v2"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
          {teamData.map((elm, i) => (
            <div key={i} className="w-full">
              <div className="team-card">
                <div className="team-card_img">
                  <Image
                    width={306}
                    height={380}
                    src={elm.imageSrc}
                    alt={elm.name}
                    priority={false}
                    className="w-full"
                  />
                </div>
                <div className="mt-6">
                  <h5 className="mb-0">{elm.name}</h5>
                  <p className="mt-1">{elm.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
