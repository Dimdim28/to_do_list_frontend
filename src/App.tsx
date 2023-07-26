import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/PageLayout";
import { useAppDispatch } from "./hooks";
import { fetchAuthMe } from "./redux/slices/auth/thunk";
import ROUTES from "./routes";

import "./styles/reset.scss";
import "./styles/typography.scss";
import "./styles/global-styles.scss";
import "react-toastify/dist/ReactToastify.css";

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
    <>
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
      </div>{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
