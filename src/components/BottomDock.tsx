import { Phone, CalendarDays, MapPin, Shield } from "lucide-react";

interface BottomDockProps {
  onOpenSheet: (sheet: string) => void;
}

const BottomDock = ({ onOpenSheet }: BottomDockProps) => {
  const items = [
    { icon: Phone, label: "Comms", color: "bg-[hsl(145_60%_45%)]", sheet: "comms" },
    { icon: CalendarDays, label: "Schedule", color: "bg-[hsl(345_80%_60%)]", sheet: "schedule" },
    { icon: MapPin, label: "Facility", color: "bg-blueprint", sheet: "facility" },
    { icon: Shield, label: "Sponsors", color: "bg-[hsl(160_50%_45%)]", sheet: "sponsors" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div className="flex justify-center mb-2">
        <span className="font-mono-tech text-[9px] tracking-widest text-muted-foreground">Events</span>
        <span className="ml-2 w-6 h-0.5 bg-foreground rounded-full self-center" />
      </div>
      <div className="mx-4 mb-4 rounded-3xl bg-[hsl(var(--dock-bg)/0.9)] backdrop-blur-xl border border-[hsl(var(--glass-border))] p-3 flex justify-around">
        {items.map((item) => (
          <button
            key={item.sheet}
            onClick={() => onOpenSheet(item.sheet)}
            className={`dock-button ${item.color}`}
          >
            <item.icon size={22} className="text-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomDock;
