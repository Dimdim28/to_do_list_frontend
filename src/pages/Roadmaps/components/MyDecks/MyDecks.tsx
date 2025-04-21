import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  faCrown,
  faDoorOpen,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import roadmapAPI, {
  RoadMapProjectShortInfo,
} from '../../../../api/roadmapApi';
import { Modal } from '../../../../components/common/Modal/Modal';
import Preloader from '../../../../components/Preloader/Preloader';
import { getRelativeTime } from '../../../../helpers/string';
import { useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import ROUTES from '../../../../routes';
import { Status } from '../../../../types/shared';
import AddProject from '../AddProject/AddProject';

import DeleteProject from './DeleteProjectModal/DeleteProject';
import ExitProject from './ExitProjectModal/ExitProject';

import styles from './MyDecks.module.scss';

const MyDecks = () => {
  const navigate = useNavigate();

  const currentUserProfile = useAppSelector(selectProfile);
  const { t } = useTranslation();

  const [isDeleteProjectOpened, setIsDeleteProjectOpened] = useState(false);
  const [isExitProjectOpened, setIsExitProjectOpened] = useState(false);
  const [allProjects, setAllProjects] = useState<RoadMapProjectShortInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProject, setCurrentProject] =
    useState<RoadMapProjectShortInfo | null>(null);
  const [isProjectSettingsOpened, setIsProjectSettingsOpened] = useState(false);

  const handleEditProjectSettingsModal = (
    project: RoadMapProjectShortInfo | null,
  ) => {
    setIsProjectSettingsOpened(true);
    setCurrentProject(project);
  };

  const handleDeleteProjectClick = (project: RoadMapProjectShortInfo) => {
    setIsDeleteProjectOpened(true);
    setCurrentProject(project);
  };

  const handleExitProjectClick = (project: RoadMapProjectShortInfo) => {
    setIsExitProjectOpened(true);
    setCurrentProject(project);
  };

  const fetchAllCanBanBoards = async () => {
    setIsLoading(true);

    const result = await roadmapAPI.getBoards();

    if (result.status === Status.SUCCESS) {
      setIsLoading(false);
      setErrorMessage('');
      setAllProjects(result.data);
    } else {
      setIsLoading(false);
      setErrorMessage(result.message || '');
      setAllProjects([]);
    }
  };

  useEffect(() => {
    fetchAllCanBanBoards();
  }, []);

  if (isLoading) return <Preloader />;

  if (errorMessage) return <div className={styles.error}>{errorMessage}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <FontAwesomeIcon
          className={styles.addIcon}
          onClick={() => handleEditProjectSettingsModal(null)}
          fontSize="20px"
          icon={faPlus}
        />
      </div>

      {allProjects.length === 0 ? (
        <div className={styles.info}>{t('noRoadmapBoards')}</div>
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
              onClick={() => navigate(`${ROUTES.ROADMAP}/${el._id}`)}
            >
              <div className={styles.title}>{el.title}</div>
              <div className={styles.description}>{el.description}</div>
              <div className={styles.updatedAt}>
                {t('updatedLabel')}: {getRelativeTime(el.updatedAt, t)}
              </div>
              <div className={styles.members}>
                {t('members')}: {el.membersCount || 1}
              </div>

              {currentUserProfile?._id === el.creatorId ? (
                <FontAwesomeIcon className={styles.crown} icon={faCrown} />
              ) : null}

              <div className={styles.icons}>
                {currentUserProfile?._id === el.creatorId ? (
                  <>
                    <FontAwesomeIcon
                      className={styles.deleteIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProjectClick(el);
                      }}
                      fontSize="20px"
                      icon={faTrash}
                    />
                    <FontAwesomeIcon
                      className={styles.editIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProjectSettingsModal(el);
                      }}
                      fontSize="20px"
                      icon={faPencil}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      className={styles.deleteIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExitProjectClick(el);
                      }}
                      fontSize="20px"
                      icon={faDoorOpen}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        active={isProjectSettingsOpened}
        setActive={() => {
          setIsProjectSettingsOpened(false);
        }}
        ChildComponent={AddProject}
        childProps={{
          setAllProjects,
          currentProject,
          isOpened: isProjectSettingsOpened,
        }}
      />

      <Modal
        active={isDeleteProjectOpened}
        setActive={() => {
          setIsDeleteProjectOpened(false);
        }}
        ChildComponent={DeleteProject}
        childProps={{ setAllProjects, currentProject }}
      />

      <Modal
        active={isExitProjectOpened}
        setActive={() => {
          setIsExitProjectOpened(false);
        }}
        ChildComponent={ExitProject}
        childProps={{ setAllProjects, currentProject }}
      />
    </div>
  );
};

export default MyDecks;
