import { useNavigate } from 'react-router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../components/common/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditProjectModalOpened,
  setProjectInfo,
} from '../../../../redux/slices/canban/canban';
import { selectIsProjectSettingsOpened } from '../../../../redux/slices/canban/selectors';
import ROUTES from '../../../../routes';
import EditProjectInfo from '../../../CanBan/components/EditProjectInfo/EditProjectInfo';

import styles from './MyDecks.module.scss';

const DATA = [
  {
    id: 'board-1',
    title: 'Project Alpha',
    description: 'Kanban board for managing tasks for Project Alpha.',
    membersCount: 5,
  },
  {
    id: 'board-2',
    title: 'Marketing Campaign',
    description: 'Tasks and strategies for the new marketing campaign.',
    membersCount: 8,
  },
  {
    id: 'board-3',
    title: 'Product Development',
    description: 'Roadmap and tasks for the new product launch.',
    membersCount: 12,
  },
  {
    id: 'board-4',
    title: 'UI/UX Redesign',
    description: 'Design improvements and user feedback implementation.',
    membersCount: 6,
  },
  {
    id: 'board-5',
    title: 'QA Testing',
    description: 'Tracking bugs and issues reported during testing.',
    membersCount: 4,
  },
  {
    id: 'board-6',
    title: 'Team Onboarding',
    description: 'Tasks related to onboarding new team members.',
    membersCount: 3,
  },
  {
    id: 'board-7',
    title: 'Sprint Planning',
    description: 'Planning and organizing the next sprint activities.',
    membersCount: 7,
  },
  {
    id: 'board-8',
    title: 'Customer Support',
    description: 'Tracking customer issues and feature requests.',
    membersCount: 10,
  },
  {
    id: 'board-9',
    title: 'DevOps Tasks',
    description: 'Managing infrastructure and deployment pipelines.',
    membersCount: 5,
  },
  {
    id: 'board-10',
    title: 'Content Creation',
    description: 'Ideas and drafts for new blog posts and videos.',
    membersCount: 4,
  },
];

const MyDecks = () => {
  const navigate = useNavigate();
  const isProjectSettingsOpened = useAppSelector(selectIsProjectSettingsOpened);
  const dispatch = useAppDispatch();

  const handleEditProjectSettingsModal = () => {
    dispatch(setProjectInfo(null));
    dispatch(setEditProjectModalOpened(true));
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
        {DATA.map((el) => (
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
