"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

// Register the Observer plugin
gsap.registerPlugin(Observer);

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // --- State flags to manage animation priorities ---
    let isHoveringInteractive = false;
    let isHoveringText = false;
    let isHoveringMagnetic = false;

    // --- 1. Velocity-based Stretching and Mouse Following ---
    const observer = Observer.create({
      target: window,
      type: "pointer", // We don't need scroll or click here anymore
      onMove: (self) => {
        const { x = 0, y = 0, isPressed } = self;

        gsap.to(dot, {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
        const el = document.elementFromPoint(x, y);
        if (
          !el?.closest('a, button, [role="button"], [data-hoverable]') &&
          isHoveringInteractive
        ) {
          handleInteractiveLeave();
        }
      },
    });

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], [data-hoverable]'
    );

    const handleInteractiveEnter = () => {
      isHoveringInteractive = true;
      gsap.to(dot, {
        scale: 3,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleInteractiveLeave = () => {
      isHoveringInteractive = false;
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // [NEW]: Create the click animation function
    const handleClick = () => {
      // Create a "burst" or "ripple" effect on click
      gsap.to(dot, {
        scale: 2,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(dot, { scale: 3 });
        },
      });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("pointerenter", handleInteractiveEnter);
      el.addEventListener("pointerleave", handleInteractiveLeave);
      el.addEventListener("click", handleClick); // Add the click listener here
    });

    // --- 3. Hover Effect for Text and Inputs ---
    // ... (This part remains the same)
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, label, input, textarea"
    );

    const handleTextEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], [data-hoverable]')) {
        return;
      }
      isHoveringText = true;
      gsap.to(dot, {
        width: "4px",
        height: "32px",
        borderRadius: "4px",

        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleTextLeave = () => {
      isHoveringText = false;
      gsap.to(dot, {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    textElements.forEach((el) => {
      el.addEventListener("pointerenter", handleTextEnter);
      el.addEventListener("pointerleave", handleTextLeave);
    });

    // --- 4. [REVISED] Magnetic Effect on Cursor ---
    const magneticElements = document.querySelectorAll("[data-magnetic]");

    magneticElements.forEach((el) => {
      const htmlEl = el as HTMLElement;

      const handleMagneticEnter = () => {
        isHoveringMagnetic = true;
      };

      const handleMagneticMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = htmlEl.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const magneticStrength = 1; // 0 = no pull, 1 = full snap to center

        // Calculate the target position for the cursor (interpolated between mouse and center)
        const targetX = clientX + (centerX - clientX) * magneticStrength;
        const targetY = clientY + (centerY - clientY) * magneticStrength;

        // Animate the CURSOR towards the target position
        gsap.to(dot, {
          x: targetX,
          y: targetY,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMagneticLeave = (e: MouseEvent) => {
        isHoveringMagnetic = false;
        // Animate the cursor back to the actual mouse position for a smooth transition
        gsap.to(dot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      htmlEl.addEventListener("pointerenter", handleMagneticEnter);
      htmlEl.addEventListener("pointermove", handleMagneticMove);
      htmlEl.addEventListener("pointerleave", handleMagneticLeave);
    });

    // --- Cleanup Function ---
    return () => {
      observer.kill();
      interactiveElements.forEach((el) => {
        el.removeEventListener("pointerenter", handleInteractiveEnter);
        el.removeEventListener("pointerleave", handleInteractiveLeave);
        el.removeEventListener("click", handleClick); // Don't forget to clean up the click listener
      });
      textElements.forEach((el) => {
        el.removeEventListener("pointerenter", handleTextEnter);
        el.removeEventListener("pointerleave", handleTextLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor"></div>
    </>
  );
};

export default CustomCursor;
