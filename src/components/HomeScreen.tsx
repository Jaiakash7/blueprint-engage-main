import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import StatusBar from "./StatusBar";
import BottomDock from "./BottomDock";
import BottomSheet from "./BottomSheet";
import HomePageTwo from "./HomePageTwo";

// Your imported widgets
import HeroWidget from "./HeroWidget";
import NavIcons from "./NavIcons";
import CollegeBanner from "./CollegeBanner";

// Imported your cosmic background image!
import bgImage from "@/assets/cosmic-bg.jpg";

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
      className="relative w-full h-full overflow-hidden flex flex-col bg-background"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay to make the neon widgets pop against the background */}
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="lg:hidden">
          <StatusBar />
        </div>

        {/* College Banner at the top */}
        <div className="w-full max-w-[400px] lg:max-w-5xl mx-auto px-4 mt-2">
           <CollegeBanner />
        </div>

        {/* Swipeable pages container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {/* PAGE 1: Your new side-by-side desktop layout */}
          <div className="w-full shrink-0 snap-center flex flex-col items-center justify-center">
            <div className="w-full max-w-[400px] lg:max-w-5xl flex flex-col lg:flex-row items-center lg:items-start gap-5 lg:gap-12 h-full lg:justify-center lg:py-8 px-4 lg:px-0">
              
              {/* Left Side: Hero Widget */}
              <div className="flex-1 flex justify-center w-full mt-2 lg:mt-0">
                <HeroWidget />
              </div>

              {/* Right Side: NavIcons + Explore Events CTA */}
              <div className="flex flex-col gap-5 lg:gap-8 items-center w-full lg:w-[400px] mt-2 lg:mt-0">
                <div className="w-full">
                  <NavIcons />
                </div>
                <div className="w-full">
                  <button
                    onClick={() => navigate("/events")}
                    className="w-full glass-panel rounded-2xl lg:rounded-3xl p-4 lg:p-6 flex items-center gap-3 group active:scale-[0.98] lg:hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-safety flex items-center justify-center shrink-0">
                      <CalendarDays size={22} className="text-foreground lg:scale-125" />
                    </div>
                    <div className="flex-1 text-left lg:ml-2">
                      <p className="font-mono-tech text-[9px] lg:text-xs tracking-[0.2em] text-muted-foreground">● REGISTRATION OPEN</p>
                      <p className="text-base lg:text-xl font-bold text-foreground mt-0.5 lg:mt-1">Explore Events</p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground lg:scale-125" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* PAGE 2: Untouched, exact same as before */}
          <div className="w-full shrink-0 snap-center flex flex-col items-center">
             <div className="w-full max-w-[400px] lg:max-w-[800px] flex flex-col h-full lg:justify-center lg:py-12">
                <HomePageTwo />
             </div>
          </div>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-1.5 lg:gap-3 py-2 lg:py-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 lg:h-2 rounded-full transition-all duration-300 ${
                activePage === i ? "w-5 lg:w-8 bg-foreground" : "w-1.5 lg:w-2 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Bottom Dock */}
        <BottomDock onOpenSheet={setActiveSheet} />
      </div>

      {/* Bottom Sheets (TYPESCRIPT ERROR FIXED HERE) */}
      <AnimatePresence>
        {activeSheet && (
          <BottomSheet onClose={() => setActiveSheet(null)}>
            <div className="p-4 flex flex-col gap-4">
              <p className="text-muted-foreground text-sm">
                Content for {activeSheet} will be displayed here.
              </p>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;