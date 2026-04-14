"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function Booker() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <section className="bg-black py-12 pt-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-white">Ready to evolve your product?</h2>
          <p className="text-white/80 mt-4">
            Stop burning runway on technical debt. Let’s audit your roadmap and
            unlock your next growth phase through retention-first engineering
          </p>
        </div>
        <Cal
          namespace="15min"
          calLink="mahfuzuruiux/15min"
          style={{ width: "100%", height: "100%" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </section>
  );
}
