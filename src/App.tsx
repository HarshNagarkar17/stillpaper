import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
