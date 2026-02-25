import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronUp, Cog } from "lucide-react";
import StatusBar from "./StatusBar";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [time, setTime] = useState(new Date());
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [0, 1]);
  const scale = useTransform(y, [-200, 0], [0.95, 1]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    // Increased the swipe distance needed for desktop to prevent accidental unlocks
    if (info.offset.y < -150) {
      onUnlock();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
      style={{ y, opacity, scale }}
      drag="y"
      dragConstraints={{ top: -1000, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Hide status bar on laptop view */}
      {/* <div className="lg:hidden">
        <StatusBar />
      </div> */}

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 select-none w-full h-full lg:pt-12">
        {/* Clock */}
        <div className="flex items-center gap-3 lg:gap-8 mb-2">
          <div className="flex gap-1 lg:gap-4">
            <DigitBlock digit={hours[0]} />
            <DigitBlock digit={hours[1]} />
          </div>
          <span className="text-5xl lg:text-9xl font-bold text-foreground opacity-60 pb-2 lg:pb-6">:</span>
          <div className="flex gap-1 lg:gap-4">
            <DigitBlock digit={minutes[0]} />
            <DigitBlock digit={minutes[1]} />
          </div>
        </div>

        {/* Date */}
        <p className="font-mono-tech text-xs lg:text-xl tracking-[0.3em] lg:tracking-[0.5em] text-muted-foreground mt-4 lg:mt-10">
          {time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
        </p>

        {/* Status Card */}
        <div className="glass-panel rounded-2xl lg:rounded-[2rem] p-4 lg:p-8 mt-10 lg:mt-20 w-full max-w-[300px] lg:max-w-[500px] shadow-2xl">
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-muted flex items-center justify-center">
              <Cog size={20} className="text-caution lg:scale-[1.75]" />
            </div>
            <div>
              <p className="font-mono-tech text-[10px] lg:text-sm tracking-widest text-muted-foreground">SYSTEM STATUS</p>
              <p className="text-sm lg:text-2xl font-semibold text-foreground mt-0.5 lg:mt-1">STANDBY MODE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="flex flex-col items-center pb-10 lg:pb-16 gap-2 lg:gap-5 w-full cursor-grab active:cursor-grabbing">
        <ChevronUp size={28} className="text-muted-foreground animate-pulse-chevron lg:scale-[2]" />
        <p className="font-mono-tech text-[10px] lg:text-base tracking-[0.35em] lg:tracking-[0.5em] text-muted-foreground">
          SWIPE UP TO IGNITE
        </p>
      </div>
    </motion.div>
  );
};

const DigitBlock = ({ digit }: { digit: string }) => (
  <div className="w-16 h-20 lg:w-40 lg:h-56 rounded-2xl lg:rounded-[2.5rem] bg-muted flex items-center justify-center shadow-xl border border-white/5">
    <span className="text-5xl lg:text-[8rem] font-black text-foreground font-display">{digit}</span>
  </div>
);

export default LockScreen;