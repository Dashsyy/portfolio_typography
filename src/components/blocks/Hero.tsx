"use client";
import { useRef, useEffect } from "react";
import SplitText from "@/components/motion/SplitText";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/lib/gsap/register";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!heroRef.current) return;

    const chars = heroRef.current.querySelectorAll("[data-split] > span:not(.sr-only)");

    gsap.fromTo(
      chars,
      { yPercent: 120, rotateX: 90, opacity: 0 },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: { each: 0.02, from: "random" },
      }
    );

    if (sublineRef.current) {
      gsap.fromTo(
        sublineRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <header className="relative overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
        <div ref={heroRef} className="max-w-3xl">
          <SplitText
            as="h1"
            text="Sunhour Heng"
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
          />
          <SplitText
            as="h2"
            text="Full-stack Developer"
            className="mt-4 text-2xl md:text-3xl font-semibold text-neutral-600 dark:text-neutral-300"
          />
          <p
            ref={sublineRef}
            className="mt-6 text-lg text-neutral-600 dark:text-neutral-300"
          >
            Experienced in Laravel, React, Vue, and microservices. Building scalable, 
            reliable systems and beautiful user experiences.
          </p>
        </div>
      </div>
    </header>
  );
}
