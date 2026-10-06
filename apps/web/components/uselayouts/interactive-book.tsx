"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { useReducedMotion } from "motion/react";

export function InteractiveBook({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const reducedMotion = useReducedMotion();
  const bookRef = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!bookRef.current || reducedMotion || e.pointerType !== "mouse") return;

    const rect = bookRef.current.getBoundingClientRect();
    const cursorX = e.clientX;
    const bookCenterX = rect.left + rect.width / 2;
    const distanceFromCenter = (cursorX - bookCenterX) / (rect.width / 2);
    const targetProgress = lerp(1, 0, (distanceFromCenter + 1) / 2);
    setProgress(Math.max(0, Math.min(0.35, targetProgress)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setProgress(0);
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setProgress(0);
    }
  };
  const totalPages = 15;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const rotationAngle = (i + 1) * 10;

    pages.push(
      <div
        aria-hidden="true"
        key={i}
        className="absolute inset-0 h-full w-full rounded-lg md:rounded-2xl border border-border bg-background light"
        style={
          {
            transformStyle: "preserve-3d",
            transformOrigin: "left",
            transform: `rotateY(calc(var(--book-progress) * ${-rotationAngle}deg))`,
            zIndex: 50 + i,
            backfaceVisibility: "visible",
            "--book-progress": progress,
          } as React.CSSProperties
        }
      />,
    );
  }

  return (
    <div className="sourced-book">
      <button
        {...props}
        ref={bookRef}
        className="relative block h-full w-full touch-pan-y"
        onFocus={() => {
          if (!reducedMotion) setProgress(0.25);
        }}
        onBlur={() => setProgress(0)}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={
          {
            perspective: "1500px",
            transformStyle: "preserve-3d",
            "--book-progress": progress,
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-lg md:rounded-2xl border-2 border-border"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left",
            background: "var(--paper)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            zIndex: 1,
          }}
        />
        {pages}
        <div
          className={`book-cover absolute inset-0 h-full w-full overflow-hidden ${className ?? ""}`}
          style={
            {
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              transform: `rotateY(calc(var(--book-progress) * -165deg))`,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0 8px 8px 0",
              zIndex: 200,
              "--book-progress": progress,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              borderRadius: "0 8px 8px 0",
              boxShadow:
                "0 0 0 0.85px rgba(0, 0, 0, 0.1) inset, 2px 0 1px 0 rgba(0, 0, 0, 0.1) inset, -1.5px 0 1px 0 rgba(0, 0, 0, 0.1) inset, 0 2px 2px 0 rgba(255, 255, 255, 0.1) inset, 0 8px 16px 0 rgba(0, 0, 0, 0.05)",
            }}
          />
          <div className="absolute top-0 left-0 bottom-0 w-2 md:w-3.5 z-30 flex flex-row justify-end">
            <div className="w-0.5 h-full bg-white/25" />
            <div className="w-0.5 h-full bg-black/15" />
          </div>

          {children}
        </div>
      </button>
    </div>
  );
}
