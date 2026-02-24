import { useRef, useState, useEffect } from "react";
import { Trophy, Terminal, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";

const HomeCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const cards = [
    {
      id: "countdown",
      header: "SYSTEM LAUNCH",
      headerIcon: <span className="text-caution">⚡</span>,
      content: <CountdownWidget />,
    },
    {
      id: "rewards",
      header: "REWARDS PORTAL",
      headerIcon: <Trophy size={16} className="text-caution" />,
      content: <RewardsWidget />,
    },
    {
      id: "terminal",
      header: "ASSEMBLY SPECS",
      headerIcon: <Terminal size={16} className="text-caution" />,
      content: <TerminalWidget />,
    },
  ];

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIdx(idx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.children[0]?.clientWidth || 1;
      setActiveIdx(Math.round(scrollLeft / (cardWidth + 12)));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 pb-3"
      >
        {cards.map((card) => (
          <div key={card.id} className="snap-start shrink-0 w-[calc(100%-32px)] glass-panel rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 pt-3 pb-2">
              {card.headerIcon}
              <span className="font-mono-tech text-[10px] tracking-[0.2em] text-caution">{card.header}</span>
            </div>
            <div className="px-4 pb-4">{card.content}</div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-1">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1 rounded-full transition-all ${i === activeIdx ? "w-5 bg-foreground" : "w-1.5 bg-muted-foreground/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

const CountdownWidget = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const target = new Date("2026-03-15T09:00:00");
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4">
      <div className="flex justify-center gap-4">
        {[
          { val: timeLeft.days, label: "DAYS" },
          { val: timeLeft.hours, label: "HOURS" },
          { val: timeLeft.mins, label: "MIN" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-4xl font-black text-foreground font-display tabular-nums">
              {item.val.toString().padStart(2, "0")}
            </span>
            <span className="font-mono-tech text-[8px] tracking-[0.2em] text-muted-foreground mt-1">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground mt-4">MAR 15, 2026</p>
    </div>
  );
};

const RewardsWidget = () => (
  <div className="text-center py-4">
    <p className="text-4xl font-black text-foreground font-display">₹12,250</p>
    <p className="font-mono-tech text-[9px] tracking-[0.2em] text-muted-foreground mt-2">
      TOTAL PRIZE POOL<br />ACROSS ALL EVENTS
    </p>
    <div className="flex gap-2 mt-4">
      <div className="flex-1 glass-panel-light rounded-xl py-2 flex items-center justify-center gap-2">
        <Trophy size={12} className="text-caution" />
        <span className="font-mono-tech text-[9px] tracking-wider text-foreground">CASH PRIZES</span>
      </div>
      <div className="flex-1 glass-panel-light rounded-xl py-2 flex items-center justify-center gap-2">
        <span className="text-caution text-xs">🏅</span>
        <span className="font-mono-tech text-[9px] tracking-wider text-foreground">CERTIFICATES</span>
      </div>
    </div>
  </div>
);

const TerminalWidget = () => (
  <div className="font-mono-tech text-[11px] text-foreground/80 space-y-1 py-2">
    <p><span className="text-caution">$</span> loading ASSEMBLY_SPECS.DWG...</p>
    <p><span className="text-[hsl(var(--blueprint))]">→</span> Tolerance: ±0.05mm</p>
    <p><span className="text-[hsl(var(--blueprint))]">→</span> Material: EN8 Steel</p>
    <p><span className="text-[hsl(var(--blueprint))]">→</span> Surface Finish: N6</p>
    <p className="text-[hsl(var(--safety))]">⚠ Constraints loaded. Ready.</p>
  </div>
);

export default HomeCarousel;
