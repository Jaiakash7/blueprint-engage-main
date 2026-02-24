import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Wrench, Cpu, Cog, Zap, FlaskConical } from "lucide-react";
import StatusBar from "./StatusBar";

const events = [
  {
    title: "Chassis Design Sprint",
    subtitle: "Autodesk Fusion 360",
    icon: Wrench,
    tag: "DESIGN",
    tagColor: "text-caution",
  },
  {
    title: "Ansys Stress Simulation",
    subtitle: "FEA Analysis Challenge",
    icon: Cpu,
    tag: "SIMULATION",
    tagColor: "text-blueprint",
  },
  {
    title: "Split Muff Coupling Assembly",
    subtitle: "Precision Assembly Task",
    icon: Cog,
    tag: "ASSEMBLY",
    tagColor: "text-safety",
  },
  {
    title: "Weld Joint Analysis",
    subtitle: "NDT & Quality Control",
    icon: Zap,
    tag: "TESTING",
    tagColor: "text-caution",
  },
  {
    title: "Material Science Quiz",
    subtitle: "Metallurgy & Composites",
    icon: FlaskConical,
    tag: "THEORY",
    tagColor: "text-blueprint",
  },
];

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="absolute inset-0 z-20 bg-background flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full glass-panel-light flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <h1 className="font-mono-tech text-sm tracking-[0.2em] text-caution">BLUEPRINT CHALLENGES</h1>
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <event.icon size={22} className="text-caution" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-mono-tech text-[8px] tracking-[0.2em] ${event.tagColor}`}>{event.tag}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground truncate">{event.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventsPage;
