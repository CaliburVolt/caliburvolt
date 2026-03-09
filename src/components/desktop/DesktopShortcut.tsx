import { motion } from "framer-motion";

interface DesktopShortcutProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
}

export const DesktopShortcut = ({ icon, label, onClick, delay = 0 }: DesktopShortcutProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + delay * 0.1, type: "spring", stiffness: 300, damping: 25 }}
      onDoubleClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg w-20 transition-all duration-200 hover:bg-foreground/5 group cursor-pointer select-none"
    >
      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-primary group-hover:glow-cyan transition-all duration-300">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-foreground/80 text-center leading-tight drop-shadow-lg">
        {label}
      </span>
    </motion.button>
  );
};
