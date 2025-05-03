import { useIsMobile } from "@/hooks/use-mobile";
import FontStyleToggle from "./FontStyleToggle";
import { Note } from "@/services/db";
import { StyleToggle } from "./StyleToggle";
import { TimeDisplay } from "./TimeDisplay";
import { useFullscreen } from "@/hooks/useFullscreen";
import { FullscreenToggle } from "./FullScreenToggle";
import { NewEntryButton } from "./NewEntryButton";

const Toolbar = ({
  currentNote,
  setFontStyle,
  randomizeStyle,
  isDarkMode,
  toggleDarkMode,
  createNewNote,
}: {
  currentNote: Note;
  setFontStyle: ({ fontFamily, fontSize }) => void;
  randomizeStyle: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  createNewNote: () => void;
}) => {
  const isMobile = useIsMobile();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const setFontSize = (size: number) => {
    setFontStyle({ fontFamily: currentNote.fontFamily, fontSize: size });
  };

  const setFontFamily = (font: string) => {
    setFontStyle({ fontFamily: font, fontSize: currentNote.fontSize });
  };

  if (!currentNote) return null;
  return (
    <div className="toolbar opacity-70 hover:opacity-100">
      {isMobile ? (
        <div className="flex flex-wrap justify-between w-full gap-1 px-1"></div>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <FontStyleToggle
              fontSize={currentNote.fontSize}
              fontFamily={currentNote.fontFamily}
              setFontFamily={setFontFamily}
              setFontSize={setFontSize}
            />
            <StyleToggle randomizeStyle={randomizeStyle} />
          </div>
          <div className="flex items-center space-x-4">
            <TimeDisplay />
            <FullscreenToggle
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
            />
            <NewEntryButton createNewEntry={createNewNote} />
            <NewEntryButton createNewEntry={createNewNote} />
          </div>
        </>
      )}
    </div>
  );
};

export default Toolbar;
