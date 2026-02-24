import { motion } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ title, onClose, children }: BottomSheetProps) => {
  return (
    <>
      <motion.div
        className="absolute inset-0 z-40 bg-[hsl(0_0%_0%/0.6)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-50 h-[90%] rounded-t-3xl glass-panel overflow-hidden flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="font-mono-tech text-sm tracking-widest text-caution uppercase">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default BottomSheet;
