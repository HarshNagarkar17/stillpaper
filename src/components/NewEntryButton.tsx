import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewEntryButtonProps {
  createNewEntry: () => void;
}

export const NewEntryButton: React.FC<NewEntryButtonProps> = ({
  createNewEntry,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={createNewEntry}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New entry</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
