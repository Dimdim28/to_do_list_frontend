import { useNavigate } from 'react-router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../components/common/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditProjectModalOpened,
  setProjectInfo,
  updateTags,
  updateUsersInProject,
} from '../../../../redux/slices/canban/canban';
import {
  selectAllProjects,
  selectIsProjectSettingsOpened,
} from '../../../../redux/slices/canban/selectors';
import ROUTES from '../../../../routes';
import EditProjectInfo from '../../../CanBan/components/EditProjectInfo/EditProjectInfo';

import styles from './MyDecks.module.scss';

const MyDecks = () => {
  const navigate = useNavigate();
  const isProjectSettingsOpened = useAppSelector(selectIsProjectSettingsOpened);
  const allProjects = useAppSelector(selectAllProjects);

  const dispatch = useAppDispatch();

  const handleEditProjectSettingsModal = () => {
    dispatch(setProjectInfo(null));
    dispatch(setEditProjectModalOpened(true));
    dispatch(updateTags([]));
    dispatch(updateUsersInProject([]));
  };

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
      <div className={styles.cards}>
        {allProjects.map((el) => (
          <div
            className={styles.card}
            key={el.id}
            onClick={() => navigate(`${ROUTES.CanBan}/${el.id}`)}
          >
            <div className={styles.title}>{el.title}</div>
            <div className={styles.description}>{el.description}</div>
            <div className={styles.members}>{el.membersCount} Members</div>
          </div>
        ))}
      </div>

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
