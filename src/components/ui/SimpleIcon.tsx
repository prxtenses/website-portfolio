"use client";

import { SimpleIcon as SimpleIconType } from "simple-icons";
import React from "react";

interface SimpleIconProps {
  icon: SimpleIconType;
  size?: number;
  className?: string;
  color?: string;
}

export function SimpleIcon({ icon, size = 24, className = "", color }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color || "currentColor"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
