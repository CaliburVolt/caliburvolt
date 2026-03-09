import { Globe, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

interface BrowserWindowProps {
  url: string;
  title: string;
}

export const BrowserWindow = ({ url, title }: BrowserWindowProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* URL Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/30">
        <div className="flex items-center gap-1 text-muted-foreground">
          <ArrowLeft className="w-3.5 h-3.5" />
          <ArrowRight className="w-3.5 h-3.5" />
          <RotateCw className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 flex items-center gap-2 bg-background/60 rounded-md px-3 py-1.5 text-xs">
          <Globe className="w-3.5 h-3.5 text-primary" />
          <span className="text-muted-foreground">{url}</span>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};
