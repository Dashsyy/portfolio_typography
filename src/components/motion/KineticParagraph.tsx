"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap/register";
import useReducedMotion from "@/lib/hooks/useReducedMotion";

type Props = {
  children: string;
};

export default function KineticParagraph({ children }: Props) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    registerGsapPlugins();
    if (!containerRef.current || reduce) return;

    const chars = containerRef.current.querySelectorAll("span[data-kinetic]");

    gsap.fromTo(
      chars,
      { yPercent: 15, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          each: 0.015,
          from: "start",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true, // run only once
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduce]);

  return (
    <p
      ref={containerRef}
      className="text-2xl md:text-3xl font-semibold leading-snug"
    >
      {String(children)
        .split("")
        .map((c, i) => (
          <span
            key={i}
            data-kinetic
            className="inline-block will-change-transform"
          >
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
    </p>
  );
}
