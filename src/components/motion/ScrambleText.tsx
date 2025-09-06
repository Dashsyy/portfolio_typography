"use client";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap/register";

export type ScrambleTextHandle = { play: () => void };

type Props = {
  text: string;
  className?: string;
  /** total animation time (ms) */
  duration?: number;           // default 1200
  /** sequential = reveal left→right, all = scramble all then snap */
  mode?: "sequential" | "all";
  /** when to start */
  trigger?: "visible" | "mount" | "manual" | "hover";
  /** delay before start (ms) */
  delay?: number;
  /** character set for scrambling */
  charset?: string;
  /** start percent already revealed (0..1) */
  startReveal?: number;        // default 0
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=?[]{}<>~";

export default forwardRef<ScrambleTextHandle, Props>(function ScrambleText(
  {
    text,
    className = "",
    duration = 1200,
    mode = "sequential",
    trigger = "visible",
    delay = 0,
    charset = DEFAULT_CHARSET,
    startReveal = 0,
  },
  ref
) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [mounted, setMounted] = useState(false);

  // Reduced motion check (client only)
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useImperativeHandle(ref, () => ({ play: () => play() }), []);

  useEffect(() => {
    setMounted(true);
    registerGsapPlugins(); // ensures ScrollTrigger is registered
    // ensure text content is final string before any client effect (SSR-safe)
    if (spanRef.current) spanRef.current.textContent = text;

    if (prefersReduced) return; // respect reduced motion

    if (trigger === "mount") {
      gsap.delayedCall(delay / 1000, () => play());
    } else if (trigger === "hover" && spanRef.current) {
      const el = spanRef.current;
      const onEnter = () => play();
      el.addEventListener("mouseenter", onEnter);
      return () => el.removeEventListener("mouseenter", onEnter);
    } else if (trigger === "visible" && spanRef.current) {
      const el = spanRef.current;
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => gsap.delayedCall(delay / 1000, () => play()),
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    // manual: do nothing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, delay, prefersReduced, text, mode, duration, charset, startReveal]);

  useEffect(() => () => kill(), []);

  function kill() {
    tweenRef.current?.kill();
    tweenRef.current = null;
  }

  function play() {
    if (!spanRef.current) return;
    kill(); // reset any prior run

    const target = text;
    const len = target.length;
    if (len === 0) return;

    const state = { p: Math.max(0, Math.min(1, startReveal)) }; // progress 0..1

    tweenRef.current = gsap.to(state, {
      p: 1,
      duration: duration / 1000,
      ease: "power2.out",
      onUpdate: () => {
        if (!spanRef.current) return;
        const prog = state.p;

        let out = "";

        if (mode === "sequential") {
          const revealCount = Math.floor(prog * len);
          for (let i = 0; i < len; i++) {
            const c = target[i];
            if (c === " ") {
              out += " ";
              continue;
            }
            out += i < revealCount ? c : randChar(charset);
          }
        } else {
          // mode === "all": scramble all until near end, then snap to final
          const threshold = 0.85;
          if (prog < threshold) {
            for (let i = 0; i < len; i++) {
              const c = target[i];
              out += c === " " ? " " : randChar(charset);
            }
          } else {
            out = target;
          }
        }

        spanRef.current.textContent = out;
      },
      onComplete: () => {
        if (spanRef.current) spanRef.current.textContent = target; // ensure final
        tweenRef.current = null;
      },
    });
  }

  return (
    <span
      ref={spanRef}
      className={className}
      aria-label={text}
      // render final text on server and allow client to update without warnings
      suppressHydrationWarning
    >
      {mounted ? text : text}
    </span>
  );
});

function randChar(chars: string) {
  // uses bitwise for fast floor
  return chars[(Math.random() * chars.length) | 0] || "";
}
