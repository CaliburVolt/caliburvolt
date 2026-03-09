import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, FolderOpen, Github, Twitter, Terminal } from "lucide-react";

interface TaskbarProps {
  onOpenWindow: (id: string) => void;
  openWindows: string[];
  activeWindow: string | null;
}

export const Taskbar = ({ onOpenWindow, openWindows, activeWindow }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: "about", icon: <User className="w-5 h-5" />, label: "About Me" },
    { id: "projects", icon: <FolderOpen className="w-5 h-5" />, label: "Projects" },
    { id: "terminal", icon: <Terminal className="w-5 h-5" />, label: "Terminal" },
    {
      id: "github",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      isExternal: true,
      url: "https://github.com/CaliburVolt",
    },
    {
      id: "twitter",
      icon: <Twitter className="w-5 h-5" />,
      label: "X / Twitter",
      isExternal: true,
      url: "https://x.com/CaliburVolt",
    },
  ];

  return (
    <motion.div
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 h-14 glass-strong border-t border-taskbar-border z-[9999] flex items-center justify-between px-4"
    >
      {/* Apps */}
      <div className="flex items-center gap-1">
        {apps.map((app) => {
          const isOpen = openWindows.includes(app.id);
          const isActiveWin = activeWindow === app.id;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (app.isExternal && app.url) {
                  window.open(app.url, "_blank");
                } else {
                  onOpenWindow(app.id);
                }
              }}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                isActiveWin
                  ? "bg-primary/15 text-primary"
                  : isOpen
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              title={app.label}
            >
              {app.icon}
              <span className="text-xs font-medium hidden sm:inline">{app.label}</span>
              {isOpen && (
                <motion.div
                  layoutId={`indicator-${app.id}`}
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isActiveWin ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Clock */}
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="text-right">
          <div className="text-xs font-mono font-medium text-foreground/80">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="text-[10px] font-mono">
            {time.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
