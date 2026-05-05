"use client";
import { useEffect } from "react";

export default function Booker() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-black py-12 pt-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-white">Ready to evolve your product?</h2>
          <p className="text-white/80 mt-4">
            Stop burning runway on technical debt. Let’s audit your roadmap and
            unlock your next growth phase.
          </p>
        </div>

        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/nextit-info/30min"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </section>
  );
}