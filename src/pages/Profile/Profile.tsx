import { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

import Preloader from "../../components/Preloader/Preloader";
import ProfileCard from "./ProfileCard/ProfileCard";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { ChangePass } from "./ChangePass/ChangePass";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectProfile, selectIsAuth } from "../../redux/slices/auth/selectors";
import {
  selectProfileMessage,
  selectProfileStatus,
  selectStats,
  selectUserProfile,
} from "../../redux/slices/profile/selectors";
import {
  fetchUserProfile,
  getStats,
} from "../../redux/slices/profile/thunk";
import { chartOptions, getChartData } from "../../helpers/stats";
import { Chart as ChartJS, registerables } from "chart.js";

import styles from "./Profile.module.scss";

ChartJS.register(...registerables);

const Profile: FC = () => {
  const dispatch = useAppDispatch();

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPassEditing, setIspassEditing] = useState(false);
  const [isAccountDeleting, setIsAccountDeleting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const profile = useAppSelector(selectUserProfile) || {
    username: "",
  };
  const { username } = profile;
  const [name, setName] = useState(username);

  const status = useAppSelector(selectProfileStatus);
  const message = useAppSelector(selectProfileMessage);
  const profileStats = useSelector(selectStats);
  const id = useAppSelector(selectProfile)?._id || "";
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth)
      dispatch(fetchUserProfile({ id })).then(() => {
        dispatch(getStats());
      });
  }, [id, isAuth]);

  useEffect(() => {
    setName(username);
  }, [username]);

  if (status === "loading") {
    return <Preloader />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile}>
        <ProfileCard
          isNameEditing={isNameEditing}
          setIsNameEditing={setIsNameEditing}
          name={name}
          setName={setName}

          id={id}
          setIsExiting={setIsExiting}
          setIspassEditing={setIspassEditing}
          setIsAccountDeleting={setIsAccountDeleting}

          isAccountDeleting={isAccountDeleting}
          isExiting={isExiting}
        />

        {isPassEditing && (
          <div className={styles.passwordWrapper}>
            <div className={styles.passEditing}>
              <ChangePass id={id} />
            </div>
          </div>
        )}
        {status === "error" && <p className={styles.error}>{message}</p>}
      </div>
      {profileStats.length > 0 && (
        <div className={styles.chartWrapper}>
          <Bar data={getChartData(profileStats)} options={chartOptions} />
        </div>
      )}
    </main>
  );
};

export default withLoginRedirect(Profile);
