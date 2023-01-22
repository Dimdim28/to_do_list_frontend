import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Preloader from "./components/Preloader/Preloader";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Task from "./pages/Task/Task";

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/task" element={<Task />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
