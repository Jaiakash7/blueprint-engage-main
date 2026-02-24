import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import StatusBar from "./StatusBar";
import HomeCarousel from "./HomeCarousel";
import NavGrid from "./NavGrid";
import BottomDock from "./BottomDock";
import BottomSheet from "./BottomSheet";
import HomePageTwo from "./HomePageTwo";
import bgImage from "@/assets/bg-industrial.jpg";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(page);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--background)/0.7)]" />

      <div className="relative z-10 flex flex-col h-full">
        <StatusBar />

        {/* Swipeable pages container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {/* Page 1 */}
          <div className="w-full shrink-0 snap-center flex flex-col">
            {/* Carousel */}
            <div className="mt-2">
              <HomeCarousel />
            </div>

            {/* Nav Grid */}
            <div className="mt-5">
              <NavGrid />
            </div>

            {/* CTA */}
            <div className="mt-5 px-4">
              <button
                onClick={() => navigate("/events")}
                className="w-full glass-panel rounded-2xl p-4 flex items-center gap-3 group active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-safety flex items-center justify-center shrink-0">
                  <CalendarDays size={22} className="text-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-mono-tech text-[9px] tracking-[0.2em] text-muted-foreground">● REGISTRATION OPEN</p>
                  <p className="text-base font-bold text-foreground mt-0.5">Explore Events</p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Page 2 */}
          <div className="w-full shrink-0 snap-center flex flex-col">
            <HomePageTwo />
          </div>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-1.5 py-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activePage === i ? "w-5 bg-foreground" : "w-1.5 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Bottom Dock */}
        <BottomDock onOpenSheet={setActiveSheet} />
      </div>

      {/* Bottom Sheets */}
      <AnimatePresence>
        {activeSheet === "facility" && (
          <BottomSheet title="Facility Map" onClose={() => setActiveSheet(null)}>
            <div className="space-y-4 mt-4">
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-xs text-caution tracking-wider">WORKSHOP A</p>
                <p className="text-sm text-foreground mt-1">CNC Machining Bay — Building 3, Floor 1</p>
              </div>
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-xs text-caution tracking-wider">WORKSHOP B</p>
                <p className="text-sm text-foreground mt-1">Assembly & Testing Lab — Building 5, Floor 2</p>
              </div>
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-xs text-caution tracking-wider">MAIN ARENA</p>
                <p className="text-sm text-foreground mt-1">Exhibition Hall — Central Campus</p>
              </div>
            </div>
          </BottomSheet>
        )}
        {activeSheet === "schedule" && (
          <BottomSheet title="Schedule" onClose={() => setActiveSheet(null)}>
            <div className="space-y-3 mt-4">
              {["09:00 — Registration & Kit Collection", "10:00 — Opening Ceremony", "11:00 — Challenge Round 1", "13:00 — Lunch Break", "14:00 — Challenge Round 2", "16:00 — Finals & Awards"].map((item) => (
                <div key={item} className="glass-panel-light rounded-xl p-3">
                  <p className="font-mono-tech text-xs text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </BottomSheet>
        )}
        {activeSheet === "sponsors" && (
          <BottomSheet title="Sponsors" onClose={() => setActiveSheet(null)}>
            <div className="space-y-4 mt-4">
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-[10px] text-caution tracking-wider">TITLE SPONSOR</p>
                <p className="text-lg font-bold text-foreground mt-2">MechCorp Industries</p>
                <p className="text-xs text-muted-foreground mt-1">Leading manufacturer of precision tools</p>
              </div>
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-[10px] text-blueprint tracking-wider">GOLD SPONSOR</p>
                <p className="text-lg font-bold text-foreground mt-2">AutoDesk</p>
              </div>
            </div>
          </BottomSheet>
        )}
        {activeSheet === "comms" && (
          <BottomSheet title="Communications" onClose={() => setActiveSheet(null)}>
            <div className="space-y-3 mt-4">
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-xs text-caution tracking-wider">HELPDESK</p>
                <p className="text-sm text-foreground mt-1">+91 98765 43210</p>
              </div>
              <div className="glass-panel-light rounded-xl p-4">
                <p className="font-mono-tech text-xs text-caution tracking-wider">EMAIL</p>
                <p className="text-sm text-foreground mt-1">ops@mechforge.dev</p>
              </div>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
