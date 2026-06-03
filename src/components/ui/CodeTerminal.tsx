"use client";

import { motion, useReducedMotion } from "@/lib/animations";
import { useEffect, useState } from "react";

const codeLines = [
  { token: "const", text: " developer = {" },
  { token: "  school:", text: ' "University of Waterloo",' },
  { token: "  major:", text: ' "Computer Science",' },
  { token: "  stack:", text: ' ["TS", "React", "Node", "SQL"],' },
  { token: "  build:", text: " () => ship(usefulSoftware)," },
  { token: "};", text: "" },
];

export default function CodeTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(
    shouldReduceMotion ? codeLines.length : 0,
  );
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let line = 0;
    const lineInterval = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= codeLines.length) clearInterval(lineInterval);
    }, 380);

    const cursorInterval = setInterval(() => {
      setCursorOn((v) => !v);
    }, 530);

    return () => {
      clearInterval(lineInterval);
      clearInterval(cursorInterval);
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: 12 }}
      animate={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-beige bg-espresso shadow-warm-lg"
    >
      <div className="flex items-center gap-2 border-b border-espresso/80 bg-[#2a1f18] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8a598]" />
        <span className="h-2.5 w-2.5 rounded-full bg-toasted" />
        <span className="h-2.5 w-2.5 rounded-full bg-caramel/80" />
        <span className="ml-2 font-mono text-[10px] text-steamed/50">
          ~/portfolio/samuel.ts
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex flex-wrap gap-x-2">
            {line.token && (
              <span className="text-caramel/90">{line.token}</span>
            )}
            {line.text && (
              <span className="text-steamed/85">{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < codeLines.length && (
          <span
            className={`inline-block h-3.5 w-2 bg-caramel/80 ${cursorOn ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {visibleLines >= codeLines.length && (
          <span className="text-toasted/70">{"// ready to build"}</span>
        )}
      </pre>
    </motion.div>
  );
}
