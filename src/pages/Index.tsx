import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import HomeScreen from "@/components/HomeScreen";
import EventsPage from "@/components/EventsPage";

const Index = () => {
  const [locked, setLocked] = useState(true);
  const location = useLocation();

  return (
    <div className="bg-[hsl(0_0%_0%)] min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Mobile: max-w-[400px] with rounded borders 
        Desktop (lg): full screen width and height, no borders
      */}
      <div className="relative overflow-hidden shadow-2xl bg-background transition-all duration-300
        w-full h-[100dvh] max-w-[400px] max-h-[900px] sm:rounded-[3rem] sm:border-[8px] border-[hsl(220_10%_15%)]
        lg:max-w-none lg:max-h-none lg:w-full lg:h-screen lg:rounded-none lg:border-none lg:shadow-none">
        
        {/* App Content */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </AnimatePresence>

        {/* Lock Screen Overlay */}
        <AnimatePresence>
          {locked && <LockScreen onUnlock={() => setLocked(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;