import { Signal, Wifi, BatteryFull } from "lucide-react";

const StatusBar = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex items-center justify-between px-5 py-2 text-xs font-medium text-foreground z-50">
      <span className="font-mono-tech tracking-widest text-[11px]">MECHFORGE</span>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <BatteryFull size={14} />
        <span className="font-mono-tech text-[10px]">100%</span>
      </div>
    </div>
  );
};

export default StatusBar;
