import { Terminal, User, Image, Info } from "lucide-react";

const NavGrid = () => {
  const items = [
    // Using exact vibrant colors to match the target native app design
    { icon: Terminal, label: "SPECS", bg: "bg-[#1a1c23]", border: "border-zinc-700" }, // Dark terminal button
    { icon: User, label: "CREW", bg: "bg-[#3B82F6]", border: "border-[#3B82F6]" }, // Vibrant Blue
    { icon: Image, label: "RENDERS", bg: "bg-[#8B5CF6]", border: "border-[#8B5CF6]" }, // Vibrant Purple
    { icon: Info, label: "MANUAL", bg: "bg-[#10B981]", border: "border-[#10B981]" }, // Vibrant Green
  ];

  return (
    <div className="flex justify-between px-6 mt-4">
      {items.map((item) => (
        <button key={item.label} className="flex flex-col items-center gap-2 group">
          <div className={`w-[60px] h-[60px] rounded-[1.2rem] flex items-center justify-center transition-transform active:scale-95 border ${item.bg} ${item.border} shadow-lg`}>
            <item.icon size={28} className="text-white" strokeWidth={1.5} />
          </div>
          <span className="font-mono-tech text-[9px] tracking-[0.1em] text-zinc-400 font-semibold uppercase">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavGrid;
