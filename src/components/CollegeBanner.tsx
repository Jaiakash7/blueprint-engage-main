import { useState, useEffect } from "react";
import { Cog } from "lucide-react";

const COLLEGE_NAME = "MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE";

export default function CollegeBanner() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let idx = 0;
    let direction: "forward" | "pause" | "backward" = "forward";
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (direction === "forward") {
        idx++;
        setDisplayedText(COLLEGE_NAME.slice(0, idx));
        setIsTyping(true);
        if (idx >= COLLEGE_NAME.length) {
          direction = "pause";
          timeout = setTimeout(tick, 3000);
          return;
        }
        timeout = setTimeout(tick, 50);
      } else if (direction === "pause") {
        setIsTyping(false);
        direction = "backward";
        timeout = setTimeout(tick, 50);
      } else {
        idx--;
        setDisplayedText(COLLEGE_NAME.slice(0, idx));
        setIsTyping(true);
        if (idx <= 0) {
          direction = "forward";
          timeout = setTimeout(tick, 800);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full chrome-card px-4 py-3 flex items-center gap-3 overflow-hidden">
      <Cog className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: "4s" }} />
      <div className="flex-1 min-w-0">
        <span className={`font-display text-sm text-primary tracking-wider ${isTyping ? "typewriter-cursor" : ""}`}>
          {displayedText}
        </span>
      </div>
      <Cog className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
    </div>
  );
}
