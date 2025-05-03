import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
}

const FontStyleToggle = ({
  fontFamily,
  fontSize,
  setFontFamily,
  setFontSize,
}: Props) => {
  const decreaseSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const increaseSize = () => {
    if (fontSize < 32) {
      setFontSize(fontSize + 2);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={decreaseSize}
          disabled={fontSize <= 12}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-sm w-8 text-center">{fontSize}px</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={increaseSize}
          disabled={fontSize >= 32}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Select value={fontFamily} onValueChange={setFontFamily}>
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue placeholder="Font Family" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sans" className="font-sans">
            Sans-serif
          </SelectItem>
          <SelectItem value="serif" className="font-serif">
            Serif
          </SelectItem>
          <SelectItem value="mono" className="font-mono">
            Monospace
          </SelectItem>
          <SelectItem
            value="playfair"
            className="font-['Playfair_Display',serif]"
          >
            Playfair
          </SelectItem>
          <SelectItem value="roboto" className="font-['Roboto',sans-serif]">
            Roboto
          </SelectItem>
          <SelectItem
            value="merriweather"
            className="font-['Merriweather',serif]"
          >
            Merriweather
          </SelectItem>
          <SelectItem
            value="sourcecodepro"
            className="font-['Source_Code_Pro',monospace]"
          >
            Source Code Pro
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontStyleToggle;
