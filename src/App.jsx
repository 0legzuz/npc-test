import React from "react";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analysis from "./pages/Analysis";
import CardList from "./features/cardList/ui/CardList";
import CustomAppBar from "./shared/ui/AppBar";
import Dashboard from "./features/dashboard/ui/Dashboard";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<Analysis />} />
          <Route path="/card-list" element={<CardList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
