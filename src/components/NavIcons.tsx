import { Terminal, User, Image, Info } from "lucide-react";

const navItems = [
  { icon: Terminal, label: "Instructions" },
  { icon: User, label: "Profile" },
  { icon: Image, label: "Gallery" },
  { icon: Info, label: "About" },
];

export default function NavIcons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {navItems.map((item) => (
        <button key={item.label} className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-xl bg-secondary border border-primary/15 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <item.icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
