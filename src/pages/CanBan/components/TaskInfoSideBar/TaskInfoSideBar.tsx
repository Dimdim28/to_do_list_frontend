import { useCallback, useEffect, useState } from 'react';
import {
  faFolderPlus,
  faUserMinus,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
  selectProjectMembers,
  selectProjectTags,
  selectSelectedTask,
} from '../../../../redux/slices/canban/selectors';
import { Tag } from '../../../../redux/slices/canban/type';
import { User } from '../../../../types/shared';
import TagComponent from '../Tag/Tag';

import { TaskDescriptionTextArea } from './SimpleTextArea/TaskDescriptionTextArea';

import styles from './TaskInfoSideBar.module.scss';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const TaskInfoSideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpened = useAppSelector(selectIsTaskInfoSideBarOpened);
  const taskInfo = useAppSelector(selectSelectedTask);
  const members = useAppSelector(selectProjectMembers);
  const allTags = useAppSelector(selectProjectTags);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigners, setAssigners] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [isAddAssignerMenuOpened, setIsAddAssignerMenuOpened] = useState(false);
  const [isAddTagMenuOpened, setIsAddTagMenuOpened] = useState(false);

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
        editTask({
          taskId: taskInfo.task.id,
          description,
          title,
          assigners,
          tags,
        }),
      );

      //after success

      handleCLoseSideBar();
    } else {
      dispatch(
        addTask({
          title,
          description,
          columnId: taskInfo.columnId,
          assigners,
          tags,
        }),
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
      setTags([]);
    } else {
      setTitle(taskInfo.task.title);
      setDescription(taskInfo.task.description);
      setAssigners(taskInfo.task.assignedTo);
      setTags(taskInfo.task.tags);
    }
    setIsAddAssignerMenuOpened(false);
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

            <div className={styles.addMembersLine}>
              <FontAwesomeIcon
                icon={faUserPlus}
                className={styles.addUserIcon}
                onClick={() => {
                  setIsAddAssignerMenuOpened((prev) => !prev);
                }}
              />
              <div
                className={`${styles.addAssignerMenu} ${
                  isAddAssignerMenuOpened ? styles.opened : undefined
                }`}
              >
                {members
                  .filter(
                    (user) =>
                      !assigners.find((assigner) => assigner._id === user._id),
                  )
                  .map((member) => (
                    <div
                      className={styles.member}
                      key={member._id}
                      onClick={() => {
                        setAssigners((prevAssigners) => [
                          ...prevAssigners,
                          member,
                        ]);
                        setIsAddAssignerMenuOpened(false);
                      }}
                    >
                      <UserImage
                        user={member}
                        additionalClassname={styles.memberImage}
                      />
                      <p className={styles.memberName}>{member.username}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>Tags</div>

            <div className={styles.tags}>
              {tags.map((tag) => (
                <TagComponent tag={tag} key={tag.id} />
              ))}
            </div>

            <div className={styles.addTagLine}>
              <FontAwesomeIcon
                icon={faFolderPlus}
                className={styles.addTagIcon}
                onClick={() => {
                  setIsAddTagMenuOpened((prev) => !prev);
                }}
              />
              <div
                className={`${styles.addTagMenu} ${
                  isAddTagMenuOpened ? styles.opened : undefined
                }`}
              >
                {allTags
                  .filter(
                    (tagFromAllTags) =>
                      !tags.find((tag) => tagFromAllTags.id === tag.id),
                  )
                  .map((tag) => (
                    <TagComponent tag={tag} key={tag.id} />
                  ))}
              </div>
            </div>
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
