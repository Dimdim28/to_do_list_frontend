import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
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
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/task" element={<Task />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
