"use client";

import { useEffect, useState } from "react";

const PREFIX = "Sonka — ";
const ROLES = "Full Stack Developer | Reverse Engineer | ";

export default function AnimatedTitle() {
  const [text, setText] = useState(ROLES);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prev) => prev.substring(1) + prev[0]);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.title = PREFIX + text;
  }, [text]);

  return null;
}
