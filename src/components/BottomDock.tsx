import { Phone, CalendarDays, MapPin, Shield } from "lucide-react";

interface BottomDockProps {
  onOpenSheet: (sheet: string) => void;
}

const BottomDock = ({ onOpenSheet }: BottomDockProps) => {
  const items = [
    // Matching the original floating dock colors perfectly
    { icon: Phone, sheet: "comms", color: "bg-[#10B981]", iconColor: "text-white" }, // Green
    { icon: CalendarDays, sheet: "schedule", color: "bg-[#F43F5E]", iconColor: "text-white" }, // Pink/Red
    { icon: MapPin, sheet: "facility", color: "bg-[#3B82F6]", iconColor: "text-white" }, // Blue
    { icon: Shield, sheet: "sponsors", color: "bg-white", iconColor: "text-[#10B981]" }, // White shield
  ];

  return (
    <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center pb-2">
      {/* Floating Pill Container */}
      <div className="rounded-full bg-[#0a0f16]/80 backdrop-blur-2xl border border-white/10 p-3 flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
        {items.map((item) => (
          <button
            key={item.sheet}
            onClick={() => onOpenSheet(item.sheet)}
            className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform active:scale-90 ${item.color} shadow-md`}
          >
            <item.icon size={24} className={item.iconColor} strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomDock;
