"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  "🎀 Free gift wrapping on orders above ₹999",
  "🚚 Free shipping on orders above ₹499",
  "🧶 Every piece is 100% handmade with love",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through messages every 3 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-announcement h-9 flex items-center justify-center overflow-hidden">
      {/* Desktop: show all messages with separators */}
      <div className="hidden md:flex items-center gap-2 text-white text-sm tracking-[0.05em] font-body">
        {MESSAGES.map((message, index) => (
          <span key={index}>
            {message}
            {index < MESSAGES.length - 1 && (
              <span className="mx-2 text-white/60">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Mobile: cycle through messages */}
      <div className="md:hidden text-white text-sm tracking-[0.05em] font-body animate-fade-in">
        {MESSAGES[currentIndex]}
      </div>
    </div>
  );
}