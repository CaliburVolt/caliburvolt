import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface DesktopWindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  zIndex: number;
}

export const DesktopWindow = ({
  title,
  icon,
  children,
  isActive,
  onClose,
  onFocus,
  defaultPosition = { x: 100, y: 60 },
  defaultSize = { width: 700, height: 500 },
  zIndex,
}: DesktopWindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const prevState = useRef({ position, size });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    },
    [isMaximized, onFocus, position]
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: Math.max(0, dragRef.current.startPosY + dy),
      });
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging]);

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(prevState.current.position);
      setSize(prevState.current.size);
    } else {
      prevState.current = { position, size };
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 56 });
    }
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`absolute rounded-lg overflow-hidden ${isActive ? "glow-cyan" : ""}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 56px)",
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-grab active:cursor-grabbing select-none transition-colors ${
          isActive ? "bg-window-header" : "bg-muted"
        } border-b border-border/50`}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-medium text-foreground/90">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <Minus className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-destructive/20 transition-colors group"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="bg-window-body h-[calc(100%-36px)] overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};
