import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Note } from "@/services/db";

interface Props {
  currentNote: Note;
}
const TextEditor = ({ currentNote }: Props) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log({ currentNote });
  const toolbarHidden = false;
  const isDarkMode = false;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
  };
  return (
    <div
      className={cn(
        "editor-container relative max-w-3xl mx-auto px-4 py-16 h-[calc(100vh-4rem)]",
        toolbarHidden && "h-screen py-8",
        isDarkMode ? "text-gray-100" : "text-gray-800"
      )}
    >
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className={cn(
          "w-full h-full resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0",
          "leading-relaxed"
        )}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default TextEditor;
