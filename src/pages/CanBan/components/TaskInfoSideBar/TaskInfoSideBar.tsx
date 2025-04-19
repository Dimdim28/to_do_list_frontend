import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  faFolderPlus,
  faUserMinus,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import Preloader from '../../../../components/Preloader/Preloader';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addTask,
  editTask,
  setDeleteTaskModalOpen,
  setIsTaskInfoModalOpened,
  setProcessingColumnData,
  setSelectedTask,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectIsTaskInfoSideBarOpened,
  selectProjectMembers,
  selectProjectTags,
  selectSelectedTask,
} from '../../../../redux/slices/canban/selectors';
import { Tag } from '../../../../redux/slices/canban/type';
import { Status, User } from '../../../../types/shared';
import TagComponent from '../Tag/Tag';

import { TaskDescriptionTextArea } from './SimpleTextArea/TaskDescriptionTextArea';

import styles from './TaskInfoSideBar.module.scss';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

const TaskInfoSideBar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isSideBarOpened = useAppSelector(selectIsTaskInfoSideBarOpened);
  const taskInfo = useAppSelector(selectSelectedTask);
  const members = useAppSelector(selectProjectMembers);
  const allTags = useAppSelector(selectProjectTags);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigners, setAssigners] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [isAddAssignerMenuOpened, setIsAddAssignerMenuOpened] = useState(false);
  const [isAddTagMenuOpened, setIsAddTagMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async () => {
    if (!taskInfo.columnId || !projectInfo?.id) {
      return handleCLoseSideBar();
    }
    setIsLoading(true);

    if (taskInfo.task) {
      const result = await canbanAPI.updateTask({
        taskId: taskInfo.task._id,
        boardId: projectInfo.id,
        columnId: taskInfo.columnId,
        title,
        assigneeIds: assigners.map((el) => el._id),
        description,
        tagIds: tags.map((tag) => tag._id),
      });

      if (result.status === Status.SUCCESS) {
        dispatch(
          editTask({
            taskId: taskInfo.task._id,
            description,
            title,
            assigners,
            tags,
          }),
        );
        setIsLoading(false);
        setError('');
        handleCLoseSideBar();
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    } else {
      const result = await canbanAPI.createTask({
        boardId: projectInfo.id,
        columnId: taskInfo.columnId,
        title,
        assigneeIds: assigners.map((el) => el._id),
        description,
        tagIds: tags.map((tag) => tag._id),
      });

      if (result.status === Status.SUCCESS) {
        dispatch(
          addTask({
            taskId: result.data._id,
            title,
            description,
            columnId: taskInfo.columnId,
            assigners,
            tags,
            orderId: result.data.order,
          }),
        );

        setIsLoading(false);
        setError('');
        handleCLoseSideBar();
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }
  };

  const handleDeleteTask = () => {
    if (!taskInfo?.columnId || !taskInfo?.task) return;

    dispatch(
      setSelectedTask({ task: taskInfo.task, columnId: taskInfo.columnId }),
    );
    dispatch(
      setProcessingColumnData({ columnId: taskInfo.columnId, title: '' }),
    );
    dispatch(setDeleteTaskModalOpen(true));
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
      setAssigners(taskInfo.task.assignees || []);
      setTags(taskInfo.task.tags);
    }
    setIsAddAssignerMenuOpened(false);
    setIsAddTagMenuOpened(false);
    setError('');
    setIsLoading(false);
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

        {isLoading ? (
          <Preloader />
        ) : (
          <div className={styles.content}>
            <div className={styles.block}>
              <div className={styles.title}>{t('title')}</div>
              <SimpleInput
                placeholder={t('enterTitle')}
                setValue={setTitle}
                type="text"
                value={title}
              />
            </div>
            <div className={styles.block}>
              <div className={styles.title}>{t('description')}</div>
              <TaskDescriptionTextArea
                value={description}
                setValue={setDescription}
                placeholder={t('enterDescription')}
                currentTaskId={taskInfo.task?._id || ''}
              />
            </div>
            <div className={styles.block}>
              <div className={styles.title}>{t('assigners')}</div>

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
                  {members.filter(
                    (user) =>
                      !assigners.find((assigner) => assigner._id === user._id),
                  ).length === 0 ? (
                    <p>{t('noFreeMembers')}</p>
                  ) : null}
                  {members
                    .filter(
                      (user) =>
                        !assigners.find(
                          (assigner) => assigner._id === user._id,
                        ),
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
              <div className={styles.title}>{t('tags')}</div>

              <div className={styles.tags}>
                {tags.map((tag) => (
                  <TagComponent
                    tag={tag}
                    key={tag._id}
                    tagClick={(activeTag) => {
                      setTags((prevTags) =>
                        prevTags.filter((tag) => tag._id !== activeTag._id),
                      );
                    }}
                  />
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
                        !tags.find((tag) => tagFromAllTags._id === tag._id),
                    )
                    .map((tag) => (
                      <TagComponent
                        tag={tag}
                        key={tag._id}
                        tagClick={(activeTag) => {
                          setTags((prevTags) => [...prevTags, activeTag]);
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <Button
                text={t('deleteTask')}
                class="yellow"
                callback={handleDeleteTask}
              ></Button>

              <Button
                text={t('cancel')}
                class="cancel"
                callback={handleCLoseSideBar}
              ></Button>
              <Button
                disabled={title.length < 3}
                text={t('submit')}
                class="submit"
                callback={handleSubmit}
              ></Button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInfoSideBar;
