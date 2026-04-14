"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    CLUTCHCO?: {
      Init: () => void;
    };
  }
}

const ClutchWidget = () => {
  useEffect(() => {
    // Check if the script is already added to avoid duplicate loading
    if (
      !document.querySelector(
        'script[src="https://widget.clutch.co/static/js/widget.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://widget.clutch.co/static/js/widget.js";
      script.async = true;
      script.onload = () => {
        if (window.CLUTCHCO) {
          window.CLUTCHCO.Init();
        }
      };
      document.body.appendChild(script);
    } else {
      // If script already exists, just initialize the widget
      if (window.CLUTCHCO) {
        window.CLUTCHCO.Init();
      }
    }
  }, []);

  return (
    <div
      className="clutch-widget w-[180px]"
      data-url="https://widget.clutch.co"
      data-widget-type="2"
      data-height="50"
      data-nofollow="true"
      data-expandifr="true"
      data-scale="100"
      data-clutchcompany-id="2482813"
    />
  );
};

export default ClutchWidget;
