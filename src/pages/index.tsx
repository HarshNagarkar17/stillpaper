import LoadingState from "@/components/LoadingSkeleton";
import TextEditor from "@/components/TextEditor";
import Toolbar from "@/components/Toolbar";
import ToolbarToggle from "@/components/ToolbarToggle";
import { useNotesManagement } from "@/hooks/useNotesManagement";
import { useUserPreferences } from "@/hooks/useUserPreferences";

const Index = () => {
  const { isLoading, currentNote, setFontStyle, randomizeStyle } =
    useNotesManagement();
  const { preferences, toggleToolbarHidden } = useUserPreferences();

  return (
    <div className="min-h-screen transition-colors duration-300">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <TextEditor
            currentNote={currentNote}
            isDarkMode={preferences.darkMode}
            toolbarHidden={preferences.toolbarHidden}
          />
          <ToolbarToggle
            toolbarHidden={preferences.toolbarHidden}
            toggleToolbar={toggleToolbarHidden}
          />
        </>
      )}

      {!preferences.toolbarHidden && currentNote && (
        <Toolbar
          setFontStyle={setFontStyle}
          currentNote={currentNote}
          randomizeStyle={randomizeStyle}
        />
      )}
    </div>
  );
};

export default Index;
