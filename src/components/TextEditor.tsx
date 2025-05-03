import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Note, NotesDB } from "@/services/db";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";

interface Props {
  currentNote: Note;
  isDarkMode: boolean;
  toolbarHidden: boolean;
}

const TextEditor = ({ currentNote, isDarkMode, toolbarHidden }: Props) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (currentNote) setText(currentNote.content);
    if (textareaRef.current) textareaRef.current.focus();
  }, [currentNote]);

  const saveChanges = debounce(async (content: string) => {
    if (!currentNote) return;

    try {
      const updatedNote: Note = {
        ...currentNote,
        content,
        updatedAt: new Date(),
      };

      const lines = content.split("\n");
      if (lines.length > 0 && lines[0].trim()) {
        updatedNote.title = lines[0].trim().substring(0, 30);
      } else {
        updatedNote.title = "Untitled note";
      }
      const db = NotesDB.getInstance();
      await db.saveNote(updatedNote);
    } catch (error) {
      toast.error("Failed to save note!");
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    saveChanges(newText);
  };

  const getFontFamily = () => {
    switch (currentNote.fontFamily) {
      case "sans":
        return "'Lato', sans-serif";
      case "serif":
        return "'Merriweather', serif";
      case "mono":
        return "'Fira Code', monospace";
      case "playfair":
        return "'Playfair Display', serif";
      case "roboto":
        return "'Roboto', sans-serif";
      case "merriweather":
        return "'Merriweather', serif";
      case "sourcecodepro":
        return "'Source Code Pro', monospace";
      default:
        return "'Lato', sans-serif";
    }
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
        style={{
          fontFamily: getFontFamily(),
          fontSize: `${currentNote.fontSize}px`,
        }}
      />
    </div>
  );
};

export default TextEditor;
