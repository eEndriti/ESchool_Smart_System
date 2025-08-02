import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react"; 

export default function Tabs({arrayWithData = [],selected,onSelect, className = "",}) {

  const listRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabs = useMemo(
    () => arrayWithData.map((y) => ({ key: String(y.id), label: String(y.label) })),
    [arrayWithData]
  );
console.log('tabs',tabs)

  useEffect(() => {
    const el = tabRefs.current[selected];
    const list = listRef.current;
    if (!el || !list) return;

    const { left: listLeft } = list.getBoundingClientRect();
    const { left, width } = el.getBoundingClientRect();
    setIndicator({ left: left - listLeft + list.scrollLeft, width });
  }, [selected, arrayWithData]);

  useEffect(() => {
    const onResize = () => {
      const el = tabRefs.current[selected];
      const list = listRef.current;
      if (!el || !list) return;
      const { left: listLeft } = list.getBoundingClientRect();
      const { left, width } = el.getBoundingClientRect();
      setIndicator({ left: left - listLeft + list.scrollLeft, width });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selected]);

  const handleKeyDown = (e, idx) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const last = tabs.length - 1;
    let next = idx;
    if (e.key === "ArrowRight") next = idx === last ? 0 : idx + 1;
    if (e.key === "ArrowLeft")  next = idx === 0 ? last : idx - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    const nextKey = arrayWithData[next];
    tabRefs.current[nextKey]?.focus();
    onSelect?.(nextKey);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={listRef}
            role="tablist"
            aria-label="Generations"
            className="no-scrollbar relative flex w-full gap-2 overflow-x-auto rounded-xl border border-gray-200 bg-white/70 p-1 shadow-sm backdrop-blur"
          >
            <span
              className="pointer-events-none absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-200"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {tabs.map((t, idx) => {
  const active = String(selected) === t.key;
  return (
    <button
      key={t.key}
      ref={(el) => (tabRefs.current[t.key] = el)}
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect?.(t.key)}              
      onKeyDown={(e) => handleKeyDown(e, idx)}
      className={["whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer",active? "bg-blue-50 text-blue-700 ring-1 ring-blue-200": "text-gray-700 hover:bg-gray-100",].join(" ")}
    >
      {t.label}
    </button>
  );
})}

          </div>
        </div>

      
      </div>
    </div>
  );
}

