import { Trophy, Clock, Diamond, ExternalLink } from "lucide-react";

const HomePageTwo = () => {
  return (
    <div className="flex flex-col h-full px-4 pt-4">
      {/* Top icon buttons */}
      <div className="flex gap-4">
        <button className="nav-grid-button w-20 h-20">
          <div className="w-10 h-10 rounded-xl bg-caution flex items-center justify-center">
            <Trophy size={20} className="text-primary-foreground" />
          </div>
          <span className="font-mono-tech text-[9px] tracking-widest text-muted-foreground">PRIZES</span>
        </button>
        <button className="nav-grid-button w-20 h-20">
          <div className="w-10 h-10 rounded-xl bg-blueprint flex items-center justify-center">
            <Clock size={20} className="text-secondary-foreground" />
          </div>
          <span className="font-mono-tech text-[9px] tracking-widest text-muted-foreground">SCHEDULE</span>
        </button>
      </div>

      {/* Title Sponsor Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full glass-panel rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-caution/20 border border-caution/30 flex items-center justify-center mb-4">
            <Diamond size={28} className="text-caution" />
          </div>
          <p className="font-mono-tech text-[10px] tracking-[0.25em] text-caution mb-2">TITLE SPONSOR</p>
          <h2 className="text-2xl font-bold text-foreground">MechCorp Industries</h2>
          <p className="text-sm text-muted-foreground mt-2">Leading manufacturer of precision tools & industrial equipment</p>
          <button className="mt-5 flex items-center gap-1.5 font-mono-tech text-xs tracking-wider text-blueprint group">
            LEARN MORE
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageTwo;
