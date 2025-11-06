"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import AboutMe from "@/components/layout/AboutMe";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set("#AboutMeImage", {
        // autoAlpha: 0,
        // scale: 0,
        // transformOrigin: "50% 50%",
        xPercent: -150,
      });
      gsap.set("#AboutMeText", {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "50% 50%",
        // xPercent: 300,
      });
      gsap.set("#header-text-2", {
        opacity: 1,
      });

      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          id: "stage",
          trigger: "#stage",
          start: "top top",
          end: "+=100%",
          pin: true, // فقط همین کانتینر pin شود
          scrub: 1,
          anticipatePin: 1,
          pinSpacing: true, // به‌صورت پیش‌فرض padding اضافه می‌کند
          snap: {
            snapTo: [0, 1],
            duration: 0.6,
            delay: 0.05,
            ease: "power3.out",
          },
        },
      });

      tl.addLabel("headerOut")
        .to("#header-text-1", { xPercent: 200, ease: "power2.in" }, "headerOut")
        .to(
          "#header-marquee",
          { xPercent: -200, ease: "power2.in" },
          "headerOut"
        )
        .to(
          "#header-text-2",
          { yPercent: 400, opacity: 0, ease: "power2.in" },
          "headerOut"
        )
        .addLabel("contentIn")
        // گزینه جایگزین: .from("#content", {..., immediateRender:false}, "contentIn")
        .to("#AboutMeImage", { xPercent: 0, ease: "power2.out" }, "out+=0")
        .to(
          "#AboutMeText",
          { autoAlpha: 1, scale: 1, ease: "power2.out" },
          "out+=0"
        );
    },
    { scope: mainContainer }
  );

  return (
    <div id="main-container" className="overflow-x-hidden" ref={mainContainer}>
      {/* استیج پین‌شونده */}
      <div id="stage" className="relative h-screen overflow-hidden">
        {/* لایه هدر */}
        <section className="absolute inset-0 z-[2] overflow-hidden">
          <Header />
        </section>

        <AboutMe />
      </div>

      <section className="min-h-[300vh]"></section>
    </div>
  );
}
