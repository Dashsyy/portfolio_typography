"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/** Create a gsap.context scoped to a ref, auto-cleaned on unmount. */
export default function useGsapContext<T extends HTMLElement>() {
  const scope = useRef<T | null>(null);
  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {}, scope);
    return () => ctx.revert();
  }, []);
  return scope;
}
