import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/PageLayout";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Category = React.lazy(() => import("./pages/Category/Category"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Task = React.lazy(() => import("./pages/Task/Task"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
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
    </div>
  );
}

export default App;
