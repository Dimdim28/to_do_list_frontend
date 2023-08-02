import {lazy, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/PageLayout";
import { useAppDispatch } from "./hooks";
import { fetchAuthMe } from "./redux/slices/auth/thunk";
import ROUTES from "./routes";

import "./styles/reset.scss";
import "./styles/typography.scss";
import "./styles/global-styles.scss";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Home = lazy(() => import("./pages/Home/Home"));
const Task = lazy(() => import("./pages/Task/Task"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
