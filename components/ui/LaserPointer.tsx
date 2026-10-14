'use client';

import React, { useEffect, useState } from 'react';

interface LaserPointerProps {
  isActive: boolean;
}

export default function LaserPointer({ isActive }: LaserPointerProps) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Outer Glow */}
      <div className="w-8 h-8 rounded-full bg-rose-500/30 blur-sm animate-ping" />
      {/* Intense Core Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] border border-white" />
    </div>
  );
}
