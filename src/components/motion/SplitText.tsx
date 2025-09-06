"use client";
import React, { useMemo, useRef } from "react";
type Props = { text: string; as?: keyof JSX.IntrinsicElements; className?: string; itemClass?: string };
export default function SplitText({ text, as = "h1", className = "", itemClass = "inline-block" }: Props) {
  const Tag = as as any;
  const chars = useMemo(() => text.split("").map((c, i) => ({ c, i })), [text]);
  const refs = useRef<HTMLSpanElement[]>([]);
  refs.current = [];
  const setRef = (el: HTMLSpanElement | null) => el && refs.current.push(el);
  return (
    <Tag className={className} data-split>
      {chars.map(({ c, i }) => (
        <span key={i} ref={setRef} aria-hidden className={itemClass}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
