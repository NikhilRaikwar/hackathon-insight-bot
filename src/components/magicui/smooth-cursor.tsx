"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface SmoothCursorProps {
  className?: string;
  color?: string;
  size?: number;
}

export function SmoothCursor({ 
  className,
  color = "#3B82F6",
  size = 20 
}: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY, size]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference",
        className
      )}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: size,
        height: size,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
    </motion.div>
  );
}