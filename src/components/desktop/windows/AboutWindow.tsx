import { Github, Twitter, MapPin, Code2, Zap } from "lucide-react";

export const AboutWindow = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 glow-cyan">
          <img
            src="https://avatars.githubusercontent.com/u/78102681?v=4"
            alt="CaliburVolt avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">CaliburVolt</h1>
          <p className="text-muted-foreground text-sm mt-1">Full-Stack Developer & Creator</p>
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://github.com/CaliburVolt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://x.com/CaliburVolt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" /> @CaliburVolt
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Repositories", value: "4+", icon: <Code2 className="w-4 h-4" /> },
          { label: "Contributions", value: "38+", icon: <Zap className="w-4 h-4" /> },
          { label: "Active Since", value: "2021", icon: <MapPin className="w-4 h-4" /> },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <div className="flex justify-center text-primary mb-2">{stat.icon}</div>
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary">About</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Hey! I'm CaliburVolt — a passionate developer who loves building cool stuff with TypeScript. 
          From games to real-time chat apps to meme editors, I enjoy creating experiences that are fun 
          and useful. Always exploring new technologies and pushing boundaries.
        </p>
      </div>

      {/* Skills */}
      <div className="glass rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {["TypeScript", "React", "Next.js", "Node.js", "Socket.IO", "Express", "Tailwind CSS", "Python"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
