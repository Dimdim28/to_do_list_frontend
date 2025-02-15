import { useCallback, useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import { SimpleTextArea } from '../../../../components/common/SimpleTextArea/SimpleTextArea';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addTask,
  editTask,
  setIsTaskInfoModalOpened,
  setSelectedTask,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsTaskInfoSideBarOpened,
  selectSelectedTask,
} from '../../../../redux/slices/canban/selectors';

import styles from './TaskInfoSideBar.module.scss';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const TaskInfoSideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpened = useAppSelector(selectIsTaskInfoSideBarOpened);
  const taskInfo = useAppSelector(selectSelectedTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCLoseSideBar = () => {
    dispatch(setIsTaskInfoModalOpened(false));
    dispatch(setSelectedTask({ task: null }));
  };

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        dispatch(setIsTaskInfoModalOpened(false));
        dispatch(setSelectedTask({ task: null }));
      }
    },
    [dispatch],
  );

  const handleSubmit = () => {
    if (!taskInfo.columnId) {
      return handleCLoseSideBar();
    }
    if (taskInfo.task) {
      dispatch(editTask({ taskId: taskInfo.task.id, description, title }));

      //after success

      handleCLoseSideBar();
    } else {
      dispatch(addTask({ title, description, columnId: taskInfo.columnId }));

      //after success

      handleCLoseSideBar();
    }
  };

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey]);

  useEffect(() => {
    if (!taskInfo.task) {
      setTitle('');
      setDescription('');
    } else {
      setTitle(taskInfo.task.title);
      setDescription(taskInfo.task.description);
    }
  }, [taskInfo]);

  return (
    <div
      className={`${styles.blur} ${
        isSideBarOpened ? styles.active : undefined
      }`}
    >
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.closeIcon}
          onClick={handleCLoseSideBar}
        />

        <div className={styles.content}>
          <div className={styles.block}>
            <div className={styles.title}>Title</div>
            <SimpleInput
              placeholder="enter title"
              setValue={setTitle}
              type="text"
              value={title}
            />
          </div>

          <div className={styles.block}>
            <div className={styles.title}>Description</div>
            <SimpleTextArea
              value={description}
              setValue={setDescription}
              placeholder="enter description"
            />
          </div>

          <div className={styles.buttons}>
            <Button
              text="Cancel"
              class="cancel"
              callback={handleCLoseSideBar}
            ></Button>
            <Button
              text="Submit"
              class="submit"
              callback={handleSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoSideBar;
