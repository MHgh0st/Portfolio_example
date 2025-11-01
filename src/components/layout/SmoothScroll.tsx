"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const main = useRef(null);
  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper", // شناسه div بیرونی
        content: "#smooth-content", // شناسه div داخلی
        smooth: 1, // مقدار نرمی (عدد بزرگتر = نرم‌تر و با تاخیر بیشتر)
        effects: true, // فعال کردن افکت‌های ساده پارالکس
      });
    },
    { scope: main }
  );
  return (
    <>
      <div ref={main}>
        {/* این ساختار الزامی است */}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children} {/* بقیه محتوای سایت شما اینجا قرار می‌گیرد */}
          </div>
        </div>
      </div>
    </>
  );
}
