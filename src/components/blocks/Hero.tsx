"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
      <div ref={ref} style={{ opacity: 0 }}>
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
          Application Developer — Smart Axiata · Phnom Penh
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.92] mb-10">
          Sunhour<br />Heng
        </h1>
        <p className="max-w-lg text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          I build and maintain production telecom systems at Smart Axiata —
          from the nationwide RetailOps retail portal to fintech integrations,
          broadband provisioning, and microservice infrastructure.
        </p>
      </div>
    </section>
  );
}
