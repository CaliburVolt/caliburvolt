import { ExternalLink, Github, Star } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "FlappyBird",
    description: "A fun FlappyBird clone built with TypeScript. Classic arcade gameplay with a modern twist.",
    language: "TypeScript",
    url: "https://github.com/CaliburVolt/FlappyBird",
    color: "hsl(var(--glow-cyan))",
  },
  {
    name: "Memity",
    description: "Create viral memes instantly with a professional drag-and-drop meme editor! 🚀",
    language: "TypeScript",
    url: "https://github.com/CaliburVolt/Memity",
    color: "hsl(var(--glow-pink))",
  },
  {
    name: "Commune",
    description:
      "A modern, real-time chat application built with Next.js, Express, and Socket.IO, featuring secure authentication and instant messaging.",
    language: "TypeScript",
    url: "https://github.com/CaliburVolt/Commune",
    color: "hsl(var(--glow-purple))",
  },
];

export const ProjectsWindow = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gradient-cyan">Projects</h2>
        <a
          href="https://github.com/CaliburVolt?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          View all on GitHub <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {projects.map((project, i) => (
        <motion.a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="block glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
          style={{ borderLeft: `3px solid ${project.color}` }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {project.name}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  {project.language}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3" /> 0
                </span>
              </div>
            </div>
            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>
        </motion.a>
      ))}
    </div>
  );
};
