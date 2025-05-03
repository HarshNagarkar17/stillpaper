import React from "react";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StyleToggleProps {
  randomizeStyle: () => void;
}

export const StyleToggle: React.FC<StyleToggleProps> = ({ randomizeStyle }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={randomizeStyle}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Random style</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
