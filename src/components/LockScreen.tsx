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
    if (info.offset.y < -150) {
      onUnlock();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col bg-background"
      style={{ y, opacity, scale }}
      drag="y"
      dragConstraints={{ top: -800, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      exit={{ y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <StatusBar />

      {/* Clock */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 select-none">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-1">
            <DigitBlock digit={hours[0]} />
            <DigitBlock digit={hours[1]} />
          </div>
          <span className="text-5xl font-bold text-foreground opacity-60">:</span>
          <div className="flex gap-1">
            <DigitBlock digit={minutes[0]} />
            <DigitBlock digit={minutes[1]} />
          </div>
        </div>
        <p className="font-mono-tech text-xs tracking-[0.3em] text-muted-foreground mt-4">
          {time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
        </p>

        {/* Status Card */}
        <div className="glass-panel rounded-2xl p-4 mt-10 w-full max-w-[300px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Cog size={20} className="text-caution" />
            </div>
            <div>
              <p className="font-mono-tech text-[10px] tracking-widest text-muted-foreground">SYSTEM STATUS</p>
              <p className="text-sm font-semibold text-foreground">STANDBY MODE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="flex flex-col items-center pb-10 gap-2">
        <ChevronUp size={28} className="text-muted-foreground animate-pulse-chevron" />
        <p className="font-mono-tech text-[10px] tracking-[0.35em] text-muted-foreground">
          SWIPE UP TO IGNITE
        </p>
      </div>
    </motion.div>
  );
};

const DigitBlock = ({ digit }: { digit: string }) => (
  <div className="w-16 h-20 rounded-2xl bg-muted flex items-center justify-center">
    <span className="text-5xl font-black text-foreground font-display">{digit}</span>
  </div>
);

export default LockScreen;
