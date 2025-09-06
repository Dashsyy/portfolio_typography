"use client";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/lib/gsap/register";
import useReducedMotion from "@/lib/hooks/useReducedMotion";

type Props = {
  children: string;
  className?: string;
  /** how much vertical lift (px) */
  lift?: number;           // default 8
  /** blur start (px)  */
  blur?: number;           // default 4
  /** stagger per word (s) */
  stagger?: number;        // default 0.03
};

export default function EditorialParagraph({
  children,
  className = "text-2xl md:text-3xl font-semibold leading-snug",
  lift = 8,
  blur = 4,
  stagger = 0.03,
}: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduce = useReducedMotion();

  // Split into words but preserve spaces/punctuation
  const tokens = useMemo(() => {
    const text = String(children);
    // Split by spaces but keep them as separate tokens to preserve layout
    const parts = text.split(/(\s+)/);
    return parts.map((t, i) => ({ t, i, isSpace: /^\s+$/.test(t) }));
  }, [children]);

  useEffect(() => {
    registerGsapPlugins();
    if (!ref.current || reduce) return;

    const words = ref.current.querySelectorAll("span[data-word]");
    const tl = gsap.fromTo(
      words,
      {
        y: lift,
        opacity: 0,
        filter: `blur(${blur}px)`,
        letterSpacing: "-0.01em",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0em",
        duration: 0.5,
        ease: "power2.out",
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          once: true, // reveal once, no loop
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduce, lift, blur, stagger]);

  return (
    <p ref={ref} className={className}>
      {tokens.map(({ t, i, isSpace }) =>
        isSpace ? (
          <span key={`s-${i}`}>{t}</span>
        ) : (
          <span key={`w-${i}`} data-word className="inline-block will-change-transform">
            {t}
          </span>
        )
      )}
    </p>
  );
}
