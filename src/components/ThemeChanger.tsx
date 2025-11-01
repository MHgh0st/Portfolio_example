"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import React from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const changeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light";

    // @ts-ignore - document.startViewTransition might not be in all TS definitions yet
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    document.documentElement.style.setProperty("--click-x", `${x}px`);
    document.documentElement.style.setProperty("--click-y", `${y}px`);

    document.documentElement.classList.remove("theme-grow", "theme-shrink");
    if (newTheme === "dark") {
      document.documentElement.classList.add("theme-shrink");
    } else {
      document.documentElement.classList.add("theme-grow");
    }

    // @ts-ignore
    document
      .startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme);
        });
      })
      .finished.finally(() => {
        const dot = document.querySelector<HTMLDivElement>(".cursor");
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
  };

  return (
    <Button
      isIconOnly
      radius="md"
      onClick={changeTheme}
      variant="light"
      color="primary"
      data-magnetic
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
