import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Tabs({
  arrayWithData = [],     // [{ id, label }]
  selected,               // selected id (string)
  onSelect,               // (id) => void
  className = "",
}) {
  const listRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Build tabs from your data (unchanged)
  const tabs = useMemo(
    () => arrayWithData.map((y) => ({ key: String(y.id), label: String(y.label) })),
    [arrayWithData]
  );

  // NEW: auto-select when there's exactly one tab, and call onSelect once
  const didAutoSelectRef = useRef(false);
  useEffect(() => {
    if (tabs.length === 1) {
      const onlyKey = tabs[0].key;
      // fire only if not already selected and we haven't auto-selected yet
      if (selected !== onlyKey && !didAutoSelectRef.current) {
        didAutoSelectRef.current = true;
        onSelect?.(onlyKey);
      }
    } else {
      // reset guard when not in single-tab state
      didAutoSelectRef.current = false;
    }
  }, [tabs, selected, onSelect]);

  // Indicator (unchanged)
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

  // (Small fix) Use tabs to get the next key
  const handleKeyDown = (e, idx) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const last = tabs.length - 1;
    let next = idx;
    if (e.key === "ArrowRight") next = idx === last ? 0 : idx + 1;
    if (e.key === "ArrowLeft")  next = idx === 0 ? last : idx - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    const nextKey = tabs[next]?.key;
    if (!nextKey) return;
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
                  className={[
                    "whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer",
                    active
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
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
