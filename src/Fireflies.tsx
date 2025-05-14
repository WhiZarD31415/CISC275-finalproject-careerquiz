import React, { useMemo } from "react";
import { createPortal } from "react-dom";

export default function Fireflies({ count = 15 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        fly: 25 + Math.random() * 15,           // 25‑40 s drift  🔄
        delay: Math.random() * 8,
        flash: 5 + Math.random() * 3            // 5‑8 s flash cycle
      })),
    [count]
  );

  return createPortal(
    <div className="firefly-wrapper" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="firefly"
          style={
            {
              top: `${d.top}%`,
              left: `${d.left}%`,
              width: `${3 + Math.random() * 2}px`,
              height: `${3 + Math.random() * 2}px`,
              animationDuration: `${d.fly}s`,
              '--flash-delay':  `${d.delay}s`,
              '--flash-period': `${d.flash}s`
            } as React.CSSProperties
          }
        />
      ))}
    </div>,
    document.body
  );
}