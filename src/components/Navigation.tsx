"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Navigation() {
  const main = useRef<HTMLDivElement>(null);

  // تعریف سکشن‌ها (هر تعداد که دارید)
  const sections = useMemo(
    () =>
      [
        { name: "Header", title: "صفحه اصلی" },
        { name: "AboutMe", title: "درباره من" },
        // { name: "Projects", title: "پروژه‌ها" },
        // { name: "Contact", title: "تماس" },
      ] as const,
    []
  );

  type TabName = (typeof sections)[number]["name"];

  // محاسبه progress یکنواخت برای هر سکشن بین 0..1
  const tabs = useMemo(() => {
    const len: number = sections.length;
    return sections.map((s, i) => ({
      ...s,
      progress: len === 1 ? 0 : i / (len - 1),
    }));
  }, [sections]);

  const [activeTab, setActiveTab] = useState<TabName>(tabs[0].name);

  useGSAP(
    () => {
      const st = ScrollTrigger.getById("stage");
      if (!st) return;

      const update = () => {
        const p = st.progress || 0;
        let bestIdx = 0;
        let bestD = Infinity;
        for (let i = 0; i < tabs.length; i++) {
          const d = Math.abs(tabs[i].progress - p);
          if (d < bestD) {
            bestD = d;
            bestIdx = i;
          }
        }
        setActiveTab(tabs[bestIdx].name);
      };

      update();

      // یک ScrollTrigger سبک برای Sync شدن با start/end «stage»
      const watcher = ScrollTrigger.create({
        trigger: st.trigger as Element,
        start: () => st.start,
        end: () => st.end,
        onUpdate: update,
        onRefresh: update,
      });

      return () => watcher.kill();
    },
    { scope: main, dependencies: [tabs] }
  );

  const scrollToProgress = (progress: number) => {
    const st = ScrollTrigger.getById("stage");
    if (!st) return;
    const y = gsap.utils.mapRange(0, 1, st.start, st.end, progress);
    gsap.to(window, {
      duration: 1.2,
      ease: "power2.inOut",
      scrollTo: { y, autoKill: false }, // autoKill را می‌توانید برحسب نیاز تغییر دهید
    });
  };

  return (
    <div
      ref={main}
      className="backdrop-blur-md bg-primary/20 border border-white/30 rounded-3xl p-4 shadow-lg fixed right-10 bottom-10 z-[999] flex flex-col gap-y-2"
    >
      {tabs.map((tab) => (
        <div key={tab.name} className="flex items-center gap-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToProgress(tab.progress);
            }}
            className={`w-3 h-3 rounded-full border-primary border-1 ${
              tab.name === activeTab ? "bg-primary" : "bg-transparent"
            }`}
            aria-label={tab.name}
            data-hoverable
          />
          <p className="text-xs font-light">{tab.title}</p>
        </div>
      ))}
    </div>
  );
}
