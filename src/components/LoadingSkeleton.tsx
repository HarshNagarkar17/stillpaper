import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 h-[calc(100vh-8rem)]">
      <Skeleton className="w-full h-8 mb-4" />
      <Skeleton className="w-3/4 h-8 mb-4" />
      <Skeleton className="w-5/6 h-8 mb-4" />
      <Skeleton className="w-2/3 h-8 mb-4" />
      <Skeleton className="w-4/5 h-8 mb-4" />
    </div>
  );
};

export default LoadingState;
