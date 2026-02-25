import { Trophy, Clock, Diamond, ExternalLink } from "lucide-react";

const HomePageTwo = () => {
  return (
    <div className="flex flex-col h-full px-4 pt-4 lg:pt-0">
      {/* Top icon buttons */}
      <div className="flex gap-4 lg:gap-8 lg:justify-center">
        <button className="nav-grid-button w-20 h-20 lg:w-32 lg:h-32 lg:hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-caution flex items-center justify-center">
            <Trophy size={20} className="text-primary-foreground lg:scale-150" />
          </div>
          <span className="font-mono-tech text-[9px] lg:text-xs tracking-widest text-muted-foreground mt-1 lg:mt-2">PRIZES</span>
        </button>
        <button className="nav-grid-button w-20 h-20 lg:w-32 lg:h-32 lg:hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-blueprint flex items-center justify-center">
            <Clock size={20} className="text-secondary-foreground lg:scale-150" />
          </div>
          <span className="font-mono-tech text-[9px] lg:text-xs tracking-widest text-muted-foreground mt-1 lg:mt-2">SCHEDULE</span>
        </button>
      </div>

      {/* Title Sponsor Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full lg:max-w-2xl glass-panel rounded-3xl lg:rounded-[3rem] p-6 lg:p-12 flex flex-col items-center text-center shadow-xl">
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2rem] bg-caution/20 border border-caution/30 flex items-center justify-center mb-4 lg:mb-8">
            <Diamond size={28} className="text-caution lg:scale-[1.5]" />
          </div>
          <p className="font-mono-tech text-[10px] lg:text-sm tracking-[0.25em] text-caution mb-2 lg:mb-4">TITLE SPONSOR</p>
          <h2 className="text-2xl lg:text-5xl font-bold text-foreground">MechCorp Industries</h2>
          <p className="text-sm lg:text-xl text-muted-foreground mt-2 lg:mt-6">Leading manufacturer of precision tools & industrial equipment</p>
          <button className="mt-5 lg:mt-8 flex items-center gap-1.5 lg:gap-2 font-mono-tech text-xs lg:text-sm tracking-wider text-blueprint group cursor-pointer">
            LEARN MORE
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform lg:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageTwo;