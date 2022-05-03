import React from "react";
import Navbar from "./components/Navbar";
import NewsContent from "./components/Newscontent";
import FavoriteNews from "./pages/FavoriteNews";
import Form from "./components/SearchForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Form />
      <Routes>
        <Route path="/" element={<NewsContent />}></Route>
        <Route path="/favorites" element={<FavoriteNews />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
