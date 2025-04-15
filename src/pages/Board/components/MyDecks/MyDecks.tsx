import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { faCrown, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../components/common/Modal/Modal';
import Preloader from '../../../../components/Preloader/Preloader';
import { getRelativeTime } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
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

import DeleteProject from './DeleteProjectModal/DeleteTask';

import styles from './MyDecks.module.scss';

const MyDecks = () => {
  const navigate = useNavigate();
  const isProjectSettingsOpened = useAppSelector(selectIsProjectSettingsOpened);
  const allProjects = useAppSelector(selectAllProjects);
  const errorMessage = useAppSelector(selectErrorMessage);
  const status = useAppSelector(selectStatus);
  const currentUserProfile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isDeleteProjectOpened, setIsDeleteProjectOpened] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');

  const handleEditProjectSettingsModal = () => {
    dispatch(setProjectInfo(null));
    dispatch(setEditProjectModalOpened(true));
    dispatch(updateTags([]));
    dispatch(updateUsersInProject([]));
  };

  const handleDeleteProjectClick = (projectId: string, projectName: string) => {
    setIsDeleteProjectOpened(true);
    setSelectedProjectId(projectId);
    setSelectedProjectName(projectName);
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
              className={`${styles.card} ${
                currentUserProfile?._id === el.creatorId
                  ? styles.ownerCard
                  : null
              }`}
              key={el._id}
              onClick={() => navigate(`${ROUTES.CanBan}/${el._id}`)}
            >
              <div className={styles.title}>{el.title}</div>
              <div className={styles.description}>{el.description}</div>
              <div className={styles.updatedAt}>
                {t('updatedLabel')}: {getRelativeTime(el.updatedAt, t)}
              </div>

              <div className={styles.members}>
                {t('members')}: {el.membersCount || 1}
              </div>

              <FontAwesomeIcon className={styles.crown} icon={faCrown} />

              <FontAwesomeIcon
                className={styles.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProjectClick(el._id, el.title);
                }}
                fontSize="20px"
                icon={faTrash}
              />
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

      <Modal
        active={isDeleteProjectOpened}
        setActive={() => {
          setIsDeleteProjectOpened(false);
        }}
        ChildComponent={DeleteProject}
        childProps={{
          projectId: selectedProjectId,
          projectName: selectedProjectName,
        }}
      />
    </div>
  );
};

export default MyDecks;
