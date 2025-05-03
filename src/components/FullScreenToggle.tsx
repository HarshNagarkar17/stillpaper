import React from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FullscreenToggleProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  isFullscreen,
  toggleFullscreen,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
