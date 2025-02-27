import { useCallback, useEffect, useState } from 'react';
import { faUserMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import UserImage from '../../../../components/UserImage/UserImage';
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
import { User } from '../../../../types/shared';

import { TaskDescriptionTextArea } from './SimpleTextArea/TaskDescriptionTextArea';

import styles from './TaskInfoSideBar.module.scss';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const TaskInfoSideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpened = useAppSelector(selectIsTaskInfoSideBarOpened);
  const taskInfo = useAppSelector(selectSelectedTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigners, setAssigners] = useState<User[]>([]);

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
      dispatch(
        editTask({ taskId: taskInfo.task.id, description, title, assigners }),
      );

      //after success

      handleCLoseSideBar();
    } else {
      dispatch(
        addTask({ title, description, columnId: taskInfo.columnId, assigners }),
      );

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
      setAssigners([]);
    } else {
      setTitle(taskInfo.task.title);
      setDescription(taskInfo.task.description);
      setAssigners(taskInfo.task.assignedTo);
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
            <TaskDescriptionTextArea
              value={description}
              setValue={setDescription}
              placeholder="enter description"
              currentTaskId={taskInfo.task?.id || ''}
            />
          </div>

          {assigners.length > 0 ? (
            <div className={styles.block}>
              <div className={styles.title}>Assigners</div>
              <div className={styles.assigners}>
                {assigners.map((user) => (
                  <div className={styles.assigner} key={user._id}>
                    <UserImage
                      additionalClassname={styles.userImage}
                      user={user}
                    />
                    <p className={styles.userName}>{user.username}</p>
                    <FontAwesomeIcon
                      className={styles.removeIcon}
                      icon={faUserMinus}
                      onClick={() => {
                        setAssigners((prevAssigners) =>
                          prevAssigners.filter(
                            (prevAssigner) => prevAssigner._id !== user._id,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

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
