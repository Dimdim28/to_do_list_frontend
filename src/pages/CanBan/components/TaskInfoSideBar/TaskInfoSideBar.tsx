import { useCallback, useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setIsTaskInfoModalOpened,
  setSelectedTask,
} from '../../../../redux/slices/canban/canban';
import { selectIsTaskInfoSideBarOpened } from '../../../../redux/slices/canban/selectors';

import styles from './TaskInfoSideBar.module.scss';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const TaskInfoSideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpened = useAppSelector(selectIsTaskInfoSideBarOpened);

  const handleCLoseSideBar = () => {
    dispatch(setIsTaskInfoModalOpened(false));
    dispatch(setSelectedTask(null));
  };

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        dispatch(setIsTaskInfoModalOpened(false));
        dispatch(setSelectedTask(null));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey]);

  return (
    <div
      className={`${styles.wrapper} ${
        isSideBarOpened ? styles.active : undefined
      }`}
      onClick={handleCLoseSideBar}
    >
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.closeIcon}
          onClick={handleCLoseSideBar}
        />
      </div>
    </div>
  );
};

export default TaskInfoSideBar;
