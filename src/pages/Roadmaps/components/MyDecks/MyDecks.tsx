import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { faCrown, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../components/common/Modal/Modal';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import ROUTES from '../../../../routes';
import { Status } from '../../../../types/shared';
import AddProject from '../AddProject/AddProject';

import DeleteProject from './DeleteProjectModal/DeleteProject';

import styles from './MyDecks.module.scss';

const MyDecks = () => {
  const navigate = useNavigate();

  const currentUserProfile = useAppSelector(selectProfile);
  const { t } = useTranslation();

  const [isDeleteProjectOpened, setIsDeleteProjectOpened] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('');
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [allProjects, setAllProjects] = useState<
    {
      membersCount: number;
      creatorId: string;
      description: string;
      title: string;
      _id: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState(Status.LOADING);

  const [isProjectSettingsOpened, setIsProjectSettingsOpened] = useState(false);

  const handleEditProjectSettingsModal = () => {
    setSelectedProjectId(null);
    setIsProjectSettingsOpened(true);
    setSelectedProjectName('');
  };

  const handleDeleteProjectClick = (projectId: string, projectName: string) => {
    setIsDeleteProjectOpened(true);
    setSelectedProjectId(projectId);
    setSelectedProjectName(projectName);
  };

  const fetchAllCanBanBoards = async () => {
    setStatus(Status.SUCCESS);
    setErrorMessage('');
    setAllProjects([]);
  };

  useEffect(() => {
    fetchAllCanBanBoards();
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
          setIsProjectSettingsOpened(false);
        }}
        ChildComponent={AddProject}
        childProps={{ setAllProjects }}
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
