import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./hooks";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/PageLayout";
import { fetchAuthMe } from "./redux/slices/auth/thunk";

import ROUTES from "./routes";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Task = React.lazy(() => import("./pages/Task/Task"));

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.AUTH} element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
        <Route path={ROUTES.HOME} element={<PageLayout />}>
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.TASK} element={<Task />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
