import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Trophy, Award, Timer, Cog } from "lucide-react";
import yantraLogo from "@/assets/yantra-logo.jpeg";

interface Slide {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 0,
    title: "Launch Countdown",
    icon: <Timer className="w-4 h-4 text-primary" />,
    content: <CountdownContent />,
  },
  {
    id: 1,
    title: "Rewards Portal",
    icon: <Trophy className="w-4 h-4 text-primary" />,
    content: <RewardsContent />,
  },
  {
    id: 2,
    title: "Achievements",
    icon: <Award className="w-4 h-4 text-primary" />,
    content: <AchievementsContent />,
  },
];

function CountdownContent() {
  const [time, setTime] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });

  useEffect(() => {
    const target = new Date("2026-03-14T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hrs: Math.floor((diff % 86400000) / 3600000),
        min: Math.floor((diff % 3600000) / 60000),
        sec: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        {[
          { val: time.days, label: "DAYS" },
          { val: time.hrs, label: "HRS" },
          { val: time.min, label: "MIN" },
          { val: time.sec, label: "SEC" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-secondary border border-primary/20 flex items-center justify-center">
              <span className="text-3xl font-display text-primary tabular-nums">
                {String(item.val).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground tracking-widest mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <span className="text-sm text-muted-foreground border border-border rounded-full px-4 py-1">
        MAR 14, 2026
      </span>
    </div>
  );
}

function RewardsContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-display text-primary">₹12,250</div>
      <p className="text-sm text-muted-foreground text-center">
        Total Prize Pool Across All Events
      </p>
      <div className="flex gap-3 mt-2 w-full max-w-md">
        <div className="flex-1 flex items-center justify-center gap-2 bg-secondary border border-primary/10 rounded-lg py-2.5 text-sm text-foreground">
          <Trophy className="w-4 h-4 text-primary" /> Cash Prizes
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 bg-secondary border border-primary/10 rounded-lg py-2.5 text-sm text-foreground">
          <Award className="w-4 h-4 text-primary" /> Certificates
        </div>
      </div>
    </div>
  );
}

function AchievementsContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-display text-primary">1,450+</div>
      <p className="text-sm text-muted-foreground text-center">
        Participants Registered So Far
      </p>
      <div className="flex gap-3 mt-2">
        {[85, 60, 45].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-8 rounded-sm"
              style={{
                height: `${h}px`,
                background: `hsl(var(--primary) / ${[0.9, 0.6, 0.35][i]})`,
              }}
            />
            <span className="text-[10px] text-muted-foreground">
              {["Tech", "Design", "Biz"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroWidget() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="relative w-full max-w-2xl">
      <div className="chrome-card-elevated overflow-hidden min-h-[380px] flex flex-col">
        {/* Title bar with gear dots */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/20 bg-secondary/50">
          <div className="flex gap-1.5">
            <Cog className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: "3s" }} />
            <Cog className="w-3 h-3 text-primary/60 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
          </div>
          <div className="flex items-center gap-2 ml-3">
            {slide.icon}
            <span className="text-xs font-medium text-foreground">{slide.title}</span>
          </div>
        </div>

        {/* Yantra Logo */}
        <div className="flex justify-center pt-4">
          <img
            src={yantraLogo}
            alt="Yantra 2K26 Logo"
            className="w-16 h-16 rounded-full border-2 border-primary/40 object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6" key={current}>
          <div className="animate-fade-in">{slide.content}</div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 pb-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-primary/20 shadow-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-primary/20 shadow-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
