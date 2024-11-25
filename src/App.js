import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Імпорт контексту для користувача
import { AnimeProvider } from "./context/AnimeContext"; // Імпорт контексту для аніме
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorities from "./pages/Favorities";
import About from "./pages/About";
import AnimeDetails from "./pages/AnimeDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => (
  <UserProvider>  {/* Обгортка контексту користувача */}
    <AnimeProvider>  {/* Обгортка контексту аніме */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorities" element={<Favorities />} />
          <Route path="/about" element={<About />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </AnimeProvider>
  </UserProvider>
);

export default App;
