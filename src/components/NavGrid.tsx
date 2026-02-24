import { Terminal, User, Image, Info } from "lucide-react";

const NavGrid = () => {
  const items = [
    { icon: Terminal, label: "SPECS", color: "border-[hsl(var(--border))]" },
    { icon: User, label: "CREW", color: "bg-blueprint" },
    { icon: Image, label: "RENDERS", color: "bg-[hsl(270_60%_60%)]" },
    { icon: Info, label: "MANUAL", color: "bg-[hsl(160_50%_45%)]" },
  ];

  return (
    <div className="flex justify-center gap-5 px-4">
      {items.map((item) => (
        <button key={item.label} className="flex flex-col items-center gap-2 group">
          <div className={`w-[64px] h-[64px] rounded-2xl flex items-center justify-center transition-transform active:scale-90 ${
            item.label === "SPECS" ? "glass-panel-light" : item.color
          }`}>
            <item.icon size={26} className="text-foreground" />
          </div>
          <span className="font-mono-tech text-[8px] tracking-[0.15em] text-muted-foreground">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NavGrid;
