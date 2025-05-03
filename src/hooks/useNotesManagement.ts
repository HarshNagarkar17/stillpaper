import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { Note, NotesDB } from "@/services/db";

export function useNotesManagement() {
  const toast = useToast();
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadIntialNote = async () => {
      setIsLoading(true);
      try {
        const db = NotesDB.getInstance();
        await db.init();

        let note = await db.getMostRecentNote();
        if (!note) {
          note = db.createNote({
            title: "Untitled note",
            fontFamily: "sans",
            fontSize: 16,
          });
          await db.saveNote(note);
        }
        setCurrentNote(note);
      } catch (error) {
        toast.error("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };

    loadIntialNote();
  }, []);

  const setFontStyle = async ({
    fontFamily,
    fontSize,
  }: {
    fontFamily: string;
    fontSize: number;
  }) => {
    try {
      if (!fontFamily && !fontSize) return;

      if (typeof fontFamily !== "string" && typeof fontSize !== "number")
        return;

      const updatedNote = {
        ...currentNote,
        fontFamily,
        fontSize,
      };

      const db = NotesDB.getInstance();
      await db.saveNote(updatedNote);
      setCurrentNote(updatedNote);
    } catch (error) {
      toast.error("Failed to change font style");
    }
  };

  const randomizeStyle = () => {
    const fonts = [
      "sans",
      "serif",
      "mono",
      "playfair",
      "roboto",
      "merriweather",
      "sourcecodepro",
    ];
    const sizes = [16, 18, 20, 22];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    setFontStyle({ fontFamily: randomFont, fontSize: randomSize });
  };

  const createNewNote = async () => {
    try {
      console.log(currentNote?.content);
      if (currentNote && currentNote.content.trim().length < 1) return;
      console.log("creating", currentNote.content.trim().length);
      const db = NotesDB.getInstance();
      const newNote = db.createNote({
        fontFamily: "sans",
        fontSize: 18,
        title: "Untitled Note",
      });

      if (newNote) {
        setCurrentNote(newNote);
      }

      await db.saveNote(newNote);
    } catch (error) {
      toast.error("Failed to create new note!");
    }
  };
  return {
    isLoading,
    currentNote,
    setFontStyle,
    randomizeStyle,
    createNewNote,
    setCurrentNote,
  };
}
