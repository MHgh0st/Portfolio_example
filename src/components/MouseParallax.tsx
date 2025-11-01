"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer);

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * کامپوننتی برای ایجاد افکت پارالاکس بر اساس حرکت موس.
 * هرکدام از فرزندان این کامپوننت که پراپ `data-parallax-item` داشته باشند،
 * با حرکت موس جابجا می‌شوند. شدت حرکت هر آیتم با `data-strength` قابل تنظیم است.
 */
const MouseParallax: React.FC<MouseParallaxProps> = ({
  children,
  strength = 25,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-parallax-item]",
        containerRef.current
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (pointer: fine)", () => {
        const observer = Observer.create({
          target: containerRef.current,
          type: "pointer", // نوع رویداد: حرکت موس یا لمس صفحه

          // این تابع با هر حرکت موس اجرا می‌شه
          onMove: (self) => {
            const { x = 0, y = 0 } = self;
            if (!containerRef.current) return;
            const { width, height } =
              containerRef.current.getBoundingClientRect();

            const xPercent = (x / width - 0.5) * 2;
            const yPercent = (y / height - 0.5) * 2;

            // هر آیتم رو بر اساس شدت تعریف شده برای خودش حرکت می‌دیم
            items.forEach((item) => {
              const itemStrength = parseFloat(item.dataset.strength || "1");
              gsap.to(item, {
                x: xPercent * strength * itemStrength,
                y: yPercent * strength * itemStrength,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          },

          onHoverEnd: () => {
            gsap.to(items, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.75)",
            });
          },
        });
        return () => observer.kill();
      });
      mm.add("(max-width: 767px)", () => {
        if (items.length === 0) return;

        gsap.to(items, {
          x: (i) => gsap.utils.random(-10, 10, 1),
          y: (i) => gsap.utils.random(-10, 10, 1),
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: containerRef, dependencies: [strength] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
export default MouseParallax;
