import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, FolderOpen, Terminal, Github, Globe, Gamepad2 } from "lucide-react";
import { Taskbar } from "@/components/desktop/Taskbar";
import { DesktopWindow } from "@/components/desktop/DesktopWindow";
import { DesktopShortcut } from "@/components/desktop/DesktopShortcut";
import { AboutWindow } from "@/components/desktop/windows/AboutWindow";
import { ProjectsWindow } from "@/components/desktop/windows/ProjectsWindow";
import { TerminalWindow } from "@/components/desktop/windows/TerminalWindow";
import { BrowserWindow } from "@/components/desktop/BrowserWindow";

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

const WINDOW_CONFIGS: Record<string, Omit<WindowState, "id">> = {
  about: {
    title: "About Me",
    icon: <User className="w-4 h-4" />,
    content: <AboutWindow />,
    defaultPosition: { x: 80, y: 40 },
    defaultSize: { width: 550, height: 520 },
  },
  projects: {
    title: "Projects",
    icon: <FolderOpen className="w-4 h-4" />,
    content: <ProjectsWindow />,
    defaultPosition: { x: 200, y: 60 },
    defaultSize: { width: 620, height: 500 },
  },
  terminal: {
    title: "Terminal",
    icon: <Terminal className="w-4 h-4" />,
    content: <TerminalWindow />,
    defaultPosition: { x: 150, y: 100 },
    defaultSize: { width: 600, height: 380 },
  },
  "github-browser": {
    title: "GitHub — CaliburVolt",
    icon: <Globe className="w-4 h-4" />,
    content: <BrowserWindow url="https://github.com/CaliburVolt" title="GitHub" />,
    defaultPosition: { x: 120, y: 50 },
    defaultSize: { width: 800, height: 550 },
  },
  "flappybird-browser": {
    title: "FlappyBird — GitHub",
    icon: <Gamepad2 className="w-4 h-4" />,
    content: <BrowserWindow url="https://github.com/CaliburVolt/FlappyBird" title="FlappyBird" />,
    defaultPosition: { x: 160, y: 70 },
    defaultSize: { width: 800, height: 550 },
  },
  "memity-browser": {
    title: "Memity — GitHub",
    icon: <Globe className="w-4 h-4" />,
    content: <BrowserWindow url="https://github.com/CaliburVolt/Memity" title="Memity" />,
    defaultPosition: { x: 180, y: 90 },
    defaultSize: { width: 800, height: 550 },
  },
};

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveWindow(id);
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const closeWindow = useCallback(
    (id: string) => {
      setOpenWindows((prev) => prev.filter((w) => w !== id));
      setWindowOrder((prev) => prev.filter((w) => w !== id));
      if (activeWindow === id) {
        const remaining = windowOrder.filter((w) => w !== id);
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
    },
    [activeWindow, windowOrder]
  );

  const focusWindow = useCallback((id: string) => {
    setActiveWindow(id);
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const shortcuts = [
    { icon: <User className="w-6 h-6" />, label: "About Me", action: () => openWindow("about") },
    { icon: <FolderOpen className="w-6 h-6" />, label: "Projects", action: () => openWindow("projects") },
    { icon: <Terminal className="w-6 h-6" />, label: "Terminal", action: () => openWindow("terminal") },
    { icon: <Github className="w-6 h-6" />, label: "GitHub", action: () => openWindow("github-browser") },
    { icon: <Gamepad2 className="w-6 h-6" />, label: "FlappyBird", action: () => openWindow("flappybird-browser") },
    { icon: <Globe className="w-6 h-6" />, label: "Memity", action: () => openWindow("memity-browser") },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "linear-gradient(145deg, hsl(220 25% 8%), hsl(240 20% 12%), hsl(220 25% 8%))" }}>
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--glow-cyan)), transparent)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--glow-purple)), transparent)" }} />

      {/* Desktop Shortcuts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 flex flex-col gap-1"
      >
        {shortcuts.map((shortcut, i) => (
          <DesktopShortcut
            key={shortcut.label}
            icon={shortcut.icon}
            label={shortcut.label}
            onClick={shortcut.action}
            delay={i}
          />
        ))}
      </motion.div>

      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none"
      >
        {openWindows.length === 0 && (
          <>
            <h1 className="text-5xl font-bold text-gradient-cyan mb-3">CaliburVolt</h1>
            <p className="text-muted-foreground text-sm font-mono">Double-click a shortcut or use the taskbar to begin</p>
          </>
        )}
      </motion.div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((id) => {
          const config = WINDOW_CONFIGS[id];
          if (!config) return null;
          return (
            <DesktopWindow
              key={id}
              id={id}
              title={config.title}
              icon={config.icon}
              isActive={activeWindow === id}
              onClose={() => closeWindow(id)}
              onFocus={() => focusWindow(id)}
              defaultPosition={config.defaultPosition}
              defaultSize={config.defaultSize}
              zIndex={100 + windowOrder.indexOf(id)}
            >
              {config.content}
            </DesktopWindow>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        onOpenWindow={openWindow}
        openWindows={openWindows}
        activeWindow={activeWindow}
      />
    </div>
  );
};

export default Index;
