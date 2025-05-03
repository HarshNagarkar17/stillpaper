import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface ToolbarToggleProps {
  toolbarHidden: boolean;
  toggleToolbar: () => void;
}

export const ToolbarToggle: React.FC<ToolbarToggleProps> = ({
  toolbarHidden,
  toggleToolbar,
}) => {
  const isMobile = useIsMobile();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute ${
              isMobile ? "right-2 bottom-2" : "right-4 bottom-4"
            } z-10 bg-background/50 backdrop-blur-sm ${
              isMobile ? "h-10 w-10" : "h-8 w-8"
            }`}
            onClick={toggleToolbar}
            aria-label={toolbarHidden ? "Show toolbar" : "Hide toolbar"}
          >
            {toolbarHidden ? (
              <ChevronUp className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
            ) : (
              <ChevronDown className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolbarHidden ? "Show toolbar" : "Hide toolbar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolbarToggle;
