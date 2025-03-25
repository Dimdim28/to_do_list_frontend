import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../components/common/Modal/Modal';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditProjectModalOpened,
  setProjectInfo,
  updateTags,
  updateUsersInProject,
} from '../../../../redux/slices/canban/canban';
import {
  selectAllProjects,
  selectErrorMessage,
  selectIsProjectSettingsOpened,
  selectStatus,
} from '../../../../redux/slices/canban/selectors';
import { fetchAllCanBanBoards } from '../../../../redux/slices/canban/thunk';
import ROUTES from '../../../../routes';
import { Status } from '../../../../types/shared';
import EditProjectInfo from '../../../CanBan/components/EditProjectInfo/EditProjectInfo';

import styles from './MyDecks.module.scss';

const MyDecks = () => {
  const navigate = useNavigate();
  const isProjectSettingsOpened = useAppSelector(selectIsProjectSettingsOpened);
  const allProjects = useAppSelector(selectAllProjects);
  const errorMessage = useAppSelector(selectErrorMessage);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleEditProjectSettingsModal = () => {
    dispatch(setProjectInfo(null));
    dispatch(setEditProjectModalOpened(true));
    dispatch(updateTags([]));
    dispatch(updateUsersInProject([]));
  };

  useEffect(() => {
    dispatch(fetchAllCanBanBoards());
  }, []);

  if (status === Status.LOADING) return <Preloader />;

  if (status === Status.ERROR) {
    return <div className={styles.error}>{errorMessage}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <FontAwesomeIcon
          className={styles.addIcon}
          onClick={handleEditProjectSettingsModal}
          fontSize="20px"
          icon={faPlus}
        />
      </div>

      {allProjects.length === 0 ? (
        <div className={styles.info}>{t('noCanBanBoards')}</div>
      ) : (
        <div className={styles.cards}>
          {allProjects.map((el) => (
            <div
              className={styles.card}
              key={el._id}
              onClick={() => navigate(`${ROUTES.CanBan}/${el._id}`)}
            >
              <div className={styles.title}>{el.title}</div>
              <div className={styles.description}>{el.description}</div>
              <div className={styles.members}>{el.membersCount} Members</div>
            </div>
          ))}
        </div>
      )}

      <Modal
        active={isProjectSettingsOpened}
        setActive={() => {
          dispatch(setEditProjectModalOpened(false));
        }}
        ChildComponent={EditProjectInfo}
        childProps={{}}
      />
    </div>
  );
};

export default MyDecks;
