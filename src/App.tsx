import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Preloader from "./components/Preloader/Preloader";
import PageLayout from "./layouts/PageLayout";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Task from "./pages/Task/Task";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<PageLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="category" element={<Category />} />
            <Route path="task" element={<Task />} />
            <Route path="" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
