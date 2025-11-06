// src/components/layout/Navbar.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ThemeChanger from "../ThemeChanger";
import Menu from "../Menu";
// ❗️ دیگر نیازی به useTheme نداریم

const Navbar = () => {
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const logoText = "محمد حسین غلامی";

  useGSAP(
    () => {
      if (!logoContainerRef.current) return;

      const chars = gsap.utils.toArray<HTMLElement>(
        ".logo-word",
        logoContainerRef.current
      );
      const container = logoContainerRef.current;

      // ✅ ۱. تایم‌لاین حالا *فقط* مسئول انیمیشن حرکت (y) است
      tl.current = gsap.timeline({
        paused: true,
        defaults: { duration: 0.3, ease: "power2.out" },
      });

      tl.current.to(chars, {
        y: -8,
        // ❗️ رنگ از اینجا حذف شد
        stagger: {
          each: 0.05,
          from: "start",
        },
      });

      const handleMouseEnter = () => tl.current?.play();
      const handleMouseLeave = () => tl.current?.reverse();

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);

        // ✅ حالا فقط transform را پاک می‌کنیم
        gsap.set(chars, { clearProps: "transform" });
        tl.current?.kill();
      };
    },
    // ❗️ دیگر نیازی به dependencies نداریم
    { scope: logoContainerRef }
  );

  return (
    <>
      <nav className="fixed w-full top-0 z-50 min-h-22">
        <div className="mx-auto flex justify-between py-4 px-4">
          <div
            ref={logoContainerRef}
            // ✅ ۲. کلاس "group" را به کانتینر اضافه می‌کنیم
            className="text-2xl font-bold flex gap-x-2 group"
            data-hoverable
          >
            {logoText.split(" ").map((word, index) => (
              <span
                key={index}
                // ✅ ۳. رنگ هاور را با Tailwind و group-hover مدیریت می‌کنیم
                className="logo-word inline-block transition-colors duration-300 ease-out
                           group-hover:text-content1"
                // text-content1 به لطف فایل hero.ts شما
                // به صورت خودکار رنگ درست را در هر تم انتخاب می‌کند.
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex justify-start space-x-4 w-28">
            <ThemeChanger />
            <Menu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
