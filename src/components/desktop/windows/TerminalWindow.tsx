import { useState, useRef, useEffect } from "react";

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, whoami, skills, projects, socials, clear, neofetch",
  whoami: "CaliburVolt — Full-Stack Developer & Creator",
  skills: "TypeScript • React • Next.js • Node.js • Socket.IO • Express • Python",
  projects: "1. FlappyBird — TypeScript game clone\n2. Memity — Drag-and-drop meme editor\n3. Commune — Real-time chat app (Next.js + Socket.IO)",
  socials: "GitHub:  github.com/CaliburVolt\nX/Twitter: x.com/CaliburVolt",
  neofetch: `
  ██████╗ █████╗ ██╗     ██╗██████╗ ██╗   ██╗██████╗ 
 ██╔════╝██╔══██╗██║     ██║██╔══██╗██║   ██║██╔══██╗
 ██║     ███████║██║     ██║██████╔╝██║   ██║██████╔╝
 ██║     ██╔══██║██║     ██║██╔══██╗██║   ██║██╔══██╗
 ╚██████╗██║  ██║███████╗██║██████╔╝╚██████╔╝██║  ██║
  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
  
  OS:      CaliburOS v1.0
  Shell:   calibur-sh
  Uptime:  since 2021
  Langs:   TypeScript, Python
  Editor:  VS Code`,
};

export const TerminalWindow = () => {
  const [lines, setLines] = useState<string[]>([
    "Welcome to CaliburOS Terminal v1.0",
    'Type "help" for available commands.',
    "",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setLines([]);
      return;
    }
    const output = COMMANDS[trimmed] || `Command not found: ${trimmed}. Type "help" for available commands.`;
    setLines((prev) => [...prev, `$ ${cmd}`, output, ""]);
  };

  return (
    <div
      className="h-full bg-background/95 p-4 font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.startsWith("$") ? "text-primary" : "text-foreground/80"}`}>
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-primary">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              handleCommand(input);
              setInput("");
            }
          }}
          className="flex-1 bg-transparent outline-none text-foreground caret-primary"
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};
