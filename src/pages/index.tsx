import LoadingState from "@/components/LoadingSkeleton";
import TextEditor from "@/components/TextEditor";
import ToolbarToggle from "@/components/ToolbarToggle";
import { useNotesManagement } from "@/hooks/useNotesManagement";
import { useUserPreferences } from "@/hooks/useUserPreferences";

const Index = () => {
  const { isLoading, currentNote } = useNotesManagement();
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
    </div>
  );
};

export default Index;
