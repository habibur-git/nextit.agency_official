"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollTopBehavior() {
 const pathname = usePathname();
 const previousPathname = useRef<string | null>(null);

 useEffect(() => {
 if (
 typeof window !== "undefined" &&
 previousPathname.current !== pathname
 ) {
 // Only scroll to top if pathname actually changed (not on initial load)
 if (previousPathname.current !== null) {
 window.scrollTo({ top: 0, behavior: "smooth" });
 }
 previousPathname.current = pathname;
 }
 }, [pathname]);

 return null;
}
