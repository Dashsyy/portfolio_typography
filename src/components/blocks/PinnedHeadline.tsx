"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap/register";

export default function PinnedHeadline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current || !headingRef.current) return;

    // PinnedHeadline.tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 60%",   // when section top reaches 60% down the viewport
    end: "+=140%",      // extend a bit since we started later
    scrub: true,
    pin: true,
    anticipatePin: 1,   // smoother handoff
  },
});


    tl.fromTo(
      headingRef.current,
      { letterSpacing: "-0.05em", opacity: 0.2 },
      { letterSpacing: "0.05em", opacity: 1, ease: "none" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-black uppercase tracking-tight [word-spacing:-0.2em]"
        >
          Building scalable apps with <br /> Laravel · React · Microservices
        </h2>
        <p className="mt-6 max-w-3xl text-neutral-600 dark:text-neutral-300">
          I design and engineer reliable backend systems and modern UIs, blending 
          performance with usability to deliver products that scale.
        </p>
      </div>
    </section>
  );
}
