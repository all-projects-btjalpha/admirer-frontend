import React, { useState, useEffect } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  const isVisible = scrollProgress >= 5;

  return (
    <button
      onClick={scrollToTop}
      className={`transition-opacity hover:scale-105 duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } relative w-12 h-12 rounded-full max-md:hidden bg-white shadow-xl flex items-center justify-center cursor-pointer`}
      aria-label="Scroll to top"
    >
      <svg
        className="absolute top-0 left-0 rotate-[-90deg]"
        width={size}
        height={size}
      >
        <circle
          stroke="#ddd"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#7B48A5"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          // style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span className="text-sm font-bold text-[#7B48A5] z-10">
        <FaArrowUpLong />
      </span>
    </button>
  );
}
