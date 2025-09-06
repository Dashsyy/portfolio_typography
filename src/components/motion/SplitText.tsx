"use client";
import React, { JSX } from "react";

type PolymorphicProps<T extends keyof JSX.IntrinsicElements> = {
  text: string;
  as?: T;
  className?: string;
  itemClass?: string;
} & Omit<JSX.IntrinsicElements[T], "children">;

export default function SplitText<T extends keyof JSX.IntrinsicElements = "h1">({
  text,
  as,
  className = "",
  itemClass = "inline-block",
  ...rest
}: PolymorphicProps<T>) {
  const Tag = (as ?? "h1") as React.ElementType;

  const chars = React.useMemo(
    () => text.split("").map((c, i) => ({ c, i })),
    [text]
  );

  const refs = React.useRef<Array<HTMLSpanElement | null>>([]);

  return (
    <Tag className={className} data-split {...rest}>
      {chars.map(({ c, i }) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden
          className={itemClass}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
