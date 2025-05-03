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

  return {
    isLoading,
    currentNote,
  };
}
