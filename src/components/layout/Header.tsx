"use client";
import Marquee from "../Marquee";
import { Sparkles } from "lucide-react";
import MouseParallax from "../MouseParallax";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ImageBlur from "../ImageBlur";
import { CornerLeftDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Header() {
  const container = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(textContainer.current, {
        y: -50,
        scrollTrigger: {
          trigger: textContainer.current,
          start: "top-=200px top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.set(".anim-item", { opacity: 0, y: 50 });
      gsap.fromTo(
        ".anim-item",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    },
    {
      scope: container,
    }
  );
  return (
    <>
      <MouseParallax className="w-full h-full" strength={10}>
        <div
          className=" h-screen flex justify-center items-center relative"
          ref={container}
        >
          <div
            className="flex flex-col text-xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold items-center gap-y-10"
            ref={textContainer}
          >
            <div className="flex items-end gap-x-4 ">
              <p data-parallax-item data-strength="0.8" className="anim-item">
                حل چالش ها،{" "}
              </p>{" "}
              <div
                className="py-2 sm:py-4 md:py-6 lg:py-8 bg-content1/90 rounded-4xl md:rounded-[55px] w-40 sm:w-56 md:w-100 lg:w-140 overflow-hidden anim-item"
                data-parallax-item
                data-strength="1.5"
              >
                <Marquee dir="ltr" gap={24}>
                  <div className="flex items-center gap-x-8 font-regular">
                    {[
                      "HTML",
                      "Css",
                      "Tailwind",
                      "JS",
                      "TS",
                      "React",
                      "Next",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-x-8">
                        <p>{item}</p>
                        <Sparkles className="size-12 sm:size-16 md:size-30" />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>
            <div data-parallax-item data-strength="0.6" className="anim-item">
              <p>با کد تمیز و رابط کاربری مدرن</p>
            </div>
          </div>

          <ImageBlur
            src="/Header.jpg"
            classname="absolute bottom-15 left-10 anim-item"
          />
          <a
            onClick={(e) => {
              e.preventDefault();
              gsap.to(window, {
                duration: 1,
                scrollTo: "#content",
                ease: "power2.inOut",
              });
            }}
            className="flex gap-x-2 items-center text-sm absolute bottom-15 right-30 anim-item"
            data-parallax-item
            data-strength="0.4"
          >
            <p>اسکرول کن رفیق</p>
            <CornerLeftDown size={16} />
          </a>
        </div>
      </MouseParallax>
    </>
  );
}
