"use client";

import { useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  speed?: number;
  children: ReactNode;
  dir?: "ltr" | "rtl";
  gap?: number;
}

const Marquee: React.FC<MarqueeProps> = ({
  speed = 50,
  children,
  dir = "ltr",
  gap = 16,
}) => {
  let scrollTimeout;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(2);
  const reversed = dir === "rtl";

  useGSAP(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const containerWidth = container.offsetWidth;
    const contentWidth = content.offsetWidth + gap;

    const neededRepeats = Math.ceil(containerWidth / contentWidth) + 2;
    setRepeatCount(neededRepeats);

    const duration = contentWidth / speed;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        ".marquee-track",
        {
          x: reversed ? contentWidth : -contentWidth,
        },
        {
          x: reversed ? -contentWidth : contentWidth,
          duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => `${(parseFloat(x) % -contentWidth) + contentWidth}px`,
          },
        }
      );
      clearTimeout(scrollTimeout);

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 200);
          const newTimeScale = gsap.utils.clamp(0.5, 5, velocity + 1);
          gsap.to(tween, {
            timeScale: newTimeScale,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
      scrollTimeout = setTimeout(() => {
        gsap.to(tween, {
          timeScale: 1,
          duration: 1,
          ease: "power2.out",
          overwrite: true,
        });
      }, 150);
    }, container);

    return () => ctx.revert();
  }, [speed, children]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div className={`flex marquee-track `} style={{ gap: `${gap}px` }}>
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} ref={i === 1 ? contentRef : null}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
