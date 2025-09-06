"use client";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/gsap/register";

export type ScrambleTextHandle = { play: () => void };

type Props = {
  text: string;
  className?: string;
  /** total animation time (ms) */
  duration?: number;            // default 1200
  /** sequential = reveal L→R, all = scramble all then snap */
  mode?: "sequential" | "all";
  /** when to start */
  trigger?: "visible" | "mount" | "manual" | "hover";
  /** delay before start (ms) */
  delay?: number;
  /** character set for scrambling */
  charset?: string;
  /** start percent already revealed (0..1) */
  startReveal?: number;         // default 0
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

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const kill = useCallback(() => {
    tweenRef.current?.kill();
    tweenRef.current = null;
  }, []);

  const play = useCallback(() => {
    if (!spanRef.current) return;
    kill(); // reset any prior run

    const target = text;
    const len = target.length;
    if (len === 0) return;

    const state = { p: Math.max(0, Math.min(1, startReveal)) }; // 0..1

    tweenRef.current = gsap.to(state, {
      p: 1,
      duration: duration / 1000,
      ease: "power2.out",
      onUpdate: () => {
        const el = spanRef.current;
        if (!el) return;

        const prog = state.p;
        let out = "";

        if (mode === "sequential") {
          const revealCount = Math.floor(prog * len);
          for (let i = 0; i < len; i++) {
            const c = target[i];
            out += c === " " ? " " : (i < revealCount ? c : randChar(charset));
          }
        } else {
          // "all": scramble all until near end, then snap
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

        el.textContent = out;
      },
      onComplete: () => {
        if (spanRef.current) spanRef.current.textContent = target;
        tweenRef.current = null;
      },
    });
  }, [charset, duration, kill, mode, startReveal, text]);

  useImperativeHandle(ref, () => ({ play }), [play]);

  useEffect(() => {
    registerGsapPlugins(); // ensures ScrollTrigger is registered
    if (spanRef.current) spanRef.current.textContent = text;

    if (prefersReduced) return;

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
    // manual: no auto start
  }, [delay, play, prefersReduced, text, trigger]);

  useEffect(() => () => kill(), [kill]);

  return (
    <span
      ref={spanRef}
      className={className}
      aria-label={text}
      suppressHydrationWarning
    >
      {text}
    </span>
  );
});

function randChar(chars: string) {
  return chars[(Math.random() * chars.length) | 0] || "";
}
