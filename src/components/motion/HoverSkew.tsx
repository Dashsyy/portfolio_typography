"use client";
import React from "react";
export default function HoverSkew({ children }: { children: React.ReactNode }) {
  return <span className="inline-block will-change-transform origin-center">{children}</span>;
}
