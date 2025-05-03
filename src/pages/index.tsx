import LoadingState from "@/components/LoadingSkeleton";
import TextEditor from "@/components/TextEditor";
import { useNotesManagement } from "@/hooks/useNotesManagement";

const Index = () => {
  const { isLoading, currentNote } = useNotesManagement();
  return (
    <div className="min-h-screen transition-colors duration-300">
      {isLoading ? <LoadingState /> : <TextEditor currentNote={currentNote} />}
    </div>
  );
};

export default Index;
