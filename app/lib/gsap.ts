import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_FN } from "./easing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerEase("EXPO", EASE_FN.EXPO);
  gsap.registerEase("SOFT", EASE_FN.SOFT);
  gsap.registerEase("SPRING", EASE_FN.SPRING);
  gsap.registerEase("NAV", EASE_FN.NAV);
}

export { gsap, ScrollTrigger };
