"use client";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { CornerLeftUp, Heart } from "lucide-react";
gsap.registerPlugin(Flip);

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuContainer = useRef(null);
  const iconContainer = useRef(null);
  const menuFlipState = useRef<Flip.FlipState | null>(null);

  const isAnimating = useRef(false);

  const toggleMenu = () => {
    if (isAnimating.current) return;

    if (isOpen) {
      isAnimating.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          menuFlipState.current = Flip.getState(menuContainer.current, {
            props: "borderRadius",
          });
          setIsOpen(false);
          isAnimating.current = false;
        },
      });

      tl.to(".menu-item", {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(".menu-footer", { opacity: 0, y: 20, duration: 0.3 }, 0);

      tl.to(".line-1", { rotate: 0, y: 0, duration: 0.4 }, 0).to(
        ".line-2",
        { rotate: 0, y: 0, duration: 0.4 },
        "<"
      );
    } else {
      isAnimating.current = true;
      menuFlipState.current = Flip.getState(menuContainer.current, {
        props: "borderRadius",
      });
      setIsOpen(true);
      gsap.delayedCall(1, () => {
        isAnimating.current = false;
      });
    }
  };

  useGSAP(
    () => {
      if (!isOpen) {
        if (menuFlipState.current) {
          Flip.from(menuFlipState.current, {
            duration: 0.6,
            ease: "power2.inOut",
            absolute: true,
          });
        }
        return;
      }

      const tl = gsap.timeline();

      tl.add(
        Flip.from(menuFlipState.current, {
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true,
        })
      );

      tl.to(".line-1", { rotate: 45, y: 5, duration: 0.4 }, 0).to(
        ".line-2",
        { rotate: -45, y: -5, duration: 0.4 },
        "<"
      );

      tl.to(".menu-item", {
        y: 0,
        opacity: 1,
        delay: 0.2,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(".menu-footer", { opacity: 0.6, y: 0, duration: 0.5 });
    },
    { dependencies: [isOpen] }
  );

  return (
    <div
      ref={menuContainer}
      className={`z-[1000] flex justify-end overflow-hidden bg-primary text-secondary
        ${
          isOpen
            ? "fixed inset-0 mx-auto mt-4 h-[96vh] w-[97vw] rounded-3xl cursor-default"
            : "p-2 rounded-xl cursor-pointer"
        }
      `}
      onClick={!isOpen ? toggleMenu : undefined}
    >
      <div
        className={`w-full pt-20 pb-0 px-10 ${
          isOpen ? "block" : "hidden"
        } flex flex-col justify-around`}
      >
        <div>
          {/* menu Items */}
          <div className="flex flex-col h-full justify-center items-start ">
            {["صفحه اصلی", "محصولات", "درباره ما", "تماس با ما"].map(
              (item, index) => (
                <div
                  key={index}
                  data-hoverable
                  // ✅ تغییر اصلی اینجاست: تعریف وضعیت اولیه برای انیمیشن
                  className="group menu-item opacity-0 translate-y-5 mb-15 text-6xl font-extrabold cursor-pointer hover:text-secondary transition-colors duration-300"
                >
                  {item}
                  <CornerLeftUp
                    className="inline-block mr-6 group-hover:mr-8 group-hover:mb-4 transition-all duration-300"
                    size={40}
                  />
                </div>
              )
            )}
          </div>
          <div></div>
        </div>
        {/* footer */}
        <div className="menu-footer flex justify-between items-center opacity-0 translate-y-5">
          <div className="text-3xl">هیـــــان</div>
          <div className="text-sm">
            توسعه داده شده با <Heart className="inline" size={12}></Heart> توسط
            تیم هیان
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen && "ml-2.5 mt-2.5"
        } w-7 h-7 flex flex-col justify-center items-center gap-1.5 cursor-pointer`}
        onClick={toggleMenu}
        ref={iconContainer}
        data-hoverable
        data-magnetic
      >
        <div className="line-1 w-7 h-1 bg-secondary rounded-full"></div>
        <div className="line-2 w-7 h-1 bg-secondary rounded-full"></div>
      </div>
    </div>
  );
}
