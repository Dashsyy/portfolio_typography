"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/lib/gsap/register";
import useReducedMotion from "@/lib/hooks/useReducedMotion";

export default function Marquee() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    registerGsapPlugins();
    if (!innerRef.current || !wrapRef.current || reduce) return;

    // Reset any previous transforms (hot reload safety)
    gsap.set(innerRef.current, { clearProps: "all" });

    // Infinite xPercent scroll
    const tween = gsap.to(innerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 12, // adjust speed here
      repeat: -1,
    });

    // Recalculate on resize to keep things seamless
    const onResize = () => {
      // Force GSAP to recalc width-based internals
      tween.invalidate().restart();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.kill();
    };
  }, [reduce]);

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div
        ref={wrapRef}
        className="mt-12 select-none overflow-hidden border-t border-b border-neutral-200 py-3 dark:border-neutral-800"
      >
        {/* We render two copies for a seamless loop */}
        <div ref={innerRef} className="whitespace-nowrap will-change-transform">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="mr-12 text-2xl md:text-4xl font-semibold opacity-70"
            >
            A long time ago, in a galaxy far, far away... There came a time of revolution, when rebels united to challenge a tyrannical empire
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
