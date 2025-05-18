import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import subTasksAPI, { SubTaskResult } from '../../../../api/subTaskAPI';
import taskAPI, { TaskResult } from '../../../../api/taskAPI';
import Button from '../../../../components/common/Button/Button';
import { Checkbox } from '../../../../components/common/Checkbox/Checkbox';
import { Input } from '../../../../components/common/Input/Input';
import { TextArea } from '../../../../components/common/TextArea/TextArea';
import Preloader from '../../../../components/Preloader/Preloader';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import { humaniseDate, truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import {
  addSubTaskToTask,
  addTaskToList,
  updateMySubTaskInTasksList,
  updateSubTaskCompletionStatusInSubtasksList,
  updateSubTaskInTask,
  updateTaskInList,
} from '../../../../redux/slices/home/home';
import { SubTask } from '../../../../types/entities/SubTask';
import { Task } from '../../../../types/entities/Task';
import { Status, User } from '../../../../types/shared';
import Categories from '../../FiltersBar/Categories/Categories';
import ChosenUser from '../ChosenUser/ChosenUser';

import styles from './TaskForm.module.scss';

interface TaskFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    length: number;
    isForSubtask?: boolean;
    assignee?: User | null;
    setSubTasksArray?: Dispatch<SetStateAction<SubTask[]>>;
    isAssignedUser?: boolean;
    parentTaskId?: string;
  };
}

const TaskForm: FC<TaskFormProps> = ({ toggleActive, childProps }) => {
  const {
    _id,
    title: prevTitle,
    description: prevDescription,
    categories: prevCategories,
    deadline: prevDeadline,
    isCompleted: prevIscompleted,
    links: prevLinks,
    // length,
    isForSubtask,
    assignee,
    setSubTasksArray,
    isAssignedUser,
    parentTaskId,
  } = childProps;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');
  const [title, setTittle] = useState(prevTitle || '');
  const [description, setDescription] = useState(prevDescription || '');
  const [categories, setCategories] = useState(prevCategories || []);
  const [hasDeadline, setHasDeadline] = useState(!!prevDeadline);
  const [deadline, setDeadline] = useState(prevDeadline || '');
  const [isCompleted, setIsCompleted] = useState(prevIscompleted || false);
  const [links, setLinks] = useState([...(prevLinks || [])]);
  const [assigner, setAssigner] = useState<User | null>(assignee || null);

  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (childProps) {
      setStatus(Status.SUCCESS);
      setTaskError('');
      setTittle(prevTitle || '');
      setDescription(prevDescription || '');
      setCategories(prevCategories || []);
      setHasDeadline(!!prevDeadline);
      setDeadline(prevDeadline || '');
      setIsCompleted(prevIscompleted || false);
      setLinks([...(prevLinks || [])]);
      setAssigner(assignee || null);
    }
  }, [childProps]);

  const userId = profile?._id || '';
  const avatar =
    profile?.avatar ||
    'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg';
  const avatarEffect = profile?.avatarEffect;
  const username = profile?.username || '';

  const submit = async () => {
    setStatus(Status.LOADING);
    let payload = {
      title,
      description,
      links: links || [],
      categories: [],
      isCompleted: false,
      deadline: null,
    };
    payload = Object.assign(payload, {
      deadline: hasDeadline ? deadline : null,
    });
    if (categories.length >= 0)
      payload = Object.assign(payload, {
        categories: categories.map((el) => el._id),
      });
    if ([false, true].includes(isCompleted))
      payload = Object.assign(payload, { isCompleted });

    let result: TaskResult | SubTaskResult;

    if (isAssignedUser) {
      //todo: here should be logic for update shared to us task
      const response = await subTasksAPI.editSubTask({
        subTaskId: _id,
        links,
        categories: categories.map((el) => el._id),
        isCompleted,
      });

      dispatch(
        updateSubTaskCompletionStatusInSubtasksList({
          subTaskId: _id,
          isCompleted,
          taskId: parentTaskId,
        }),
      );
      dispatch(
        updateMySubTaskInTasksList({
          _id: _id,
          links,
          isCompleted,
          categories,
        }),
      );

      result = response;
    } else if (isForSubtask) {
      if (assignee) {
        const response = await subTasksAPI.editSubTask({
          subTaskId: _id,
          title,
          description,
          deadline: hasDeadline ? deadline : null,
          isCompleted,
          assigneeId: assigner?._id || '',
        });

        const typedAssigner = assigner as User;
        // setSubTasksArray((prev) =>
        //   prev.map((el) => (el._id === _id ? (result.task as SubTask) : el)),  todo: modify interfaces when be will be updated
        // );

        const { status, task } = response;

        if (status === Status.SUCCESS && parentTaskId) {
          dispatch(
            updateSubTaskInTask({
              taskId: parentTaskId as string,
              subTask: {
                ...(task as SubTask),
                title,
                description,
                deadline,
                isCompleted,
                assignee: {
                  _id: typedAssigner._id,
                  avatar: typedAssigner.avatar || '',
                  username: typedAssigner.username,
                  avatarEffect: typedAssigner.avatarEffect,
                },
              },
            }),
          );
          dispatch(
            updateMySubTaskInTasksList({
              _id: _id,
              title,
              description,
              deadline,
              isCompleted,
            }),
          );
          if (setSubTasksArray) {
            setSubTasksArray((prev) =>
              prev.map((el) =>
                el._id === _id
                  ? {
                      ...el,
                      title,
                      description,
                      deadline,
                      isCompleted,
                      assignee: {
                        _id: typedAssigner._id,
                        avatar: typedAssigner.avatar || '',
                        username: typedAssigner.username,
                        avatarEffect: typedAssigner.avatarEffect,
                      },
                    }
                  : el,
              ),
            );
          }
        }

        result = response;
      } else {
        const response = await subTasksAPI.createSubTask({
          taskId: _id,
          title,
          description,
          deadline: hasDeadline ? deadline : null,
          isCompleted,
          assigneeId: assigner?._id || '',
        });

        const { status, task } = response;

        if (status === Status.SUCCESS && parentTaskId) {
          const createdSubTask = task as SubTask;

          if (setSubTasksArray)
            setSubTasksArray((prev) => [...prev, createdSubTask]);
          dispatch(
            addSubTaskToTask({ taskId: parentTaskId, subTask: createdSubTask }),
          );
          if (createdSubTask.assignee._id === userId) {
            const {
              _id,
              title,
              description,
              isCompleted,
              deadline,
              assignee,
              dateOfCompletion,
            } = createdSubTask as SubTask & { dateOfCompletion: string };
            dispatch(
              addTaskToList({
                _id,
                title,
                description,
                isCompleted,
                links: [],
                categories: [],
                deadline,
                creator: assignee,
                type: 'subtask',
                dateOfCompletion,
              } as any),
            );
          }
        }

        result = response;
      }
    } else {
      if (_id) {
        const response = await taskAPI.edittask({ _id, ...payload });

        const { task, status } = response;

        if (status === Status.SUCCESS) {
          dispatch(updateTaskInList(task as Task));
        }

        result = response;
      } else {
        const response = await taskAPI.addtask({ user: userId, ...payload });

        const { task, status } = response;

        if (status === Status.SUCCESS) {
          dispatch(addTaskToList(task as Task));
        }
        result = response;
      }
    }

    const { message, status } = result;

    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  const onChangeCheckBoxDeadline = () => {
    setHasDeadline((prev) => {
      if (prev) {
        setDeadline('');
      } else {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        setDeadline(today.toISOString());
      }
      return !prev;
    });
  };

  const onChangeCheckBoxIsCompleted = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          {isForSubtask ? (
            assigner ? (
              <ChosenUser
                user={assigner}
                removeUser={() => {
                  setAssigner(null);
                }}
                isForCreation={!assignee}
              />
            ) : (
              <>
                <SearchUser
                  handleUserClick={(user: User) => {
                    setAssigner(user);
                  }}
                />
                <button
                  className={styles.assignYourself}
                  onClick={() => {
                    setAssigner({
                      _id: userId,
                      avatar,
                      username,
                      avatarEffect,
                    });
                  }}
                >
                  {t('assignYourself')}
                </button>
              </>
            )
          ) : (
            <Categories
              isForTask
              activeCategories={categories}
              setActiveCategories={setCategories}
            />
          )}
          {isAssignedUser ? (
            <h1 className={styles.title}>{title} </h1>
          ) : (
            <Input
              title={t('title')}
              value={title}
              setValue={setTittle}
              type="text"
            />
          )}

          {isAssignedUser ? (
            <p className={styles.description}>{truncate(description, 80)}</p>
          ) : (
            <TextArea
              title={t('description')}
              value={description}
              setValue={setDescription}
            />
          )}

          <div className={styles.checkBox}>
            {isAssignedUser ? (
              deadline && (
                <p className={styles.deadline}>
                  {t('deadline')} {humaniseDate(deadline)}
                </p>
              )
            ) : (
              <Checkbox
                isChecked={hasDeadline}
                callback={onChangeCheckBoxDeadline}
                label={t('taskHasDeadline')}
              />
            )}

            {links.map((link, index) => (
              <div className={styles.linkRow} key={index}>
                <Input
                  title={t('link')}
                  value={link}
                  setValue={(newLink: any) => {
                    setLinks((prev) =>
                      prev.map((el, id) => (id === index ? newLink : el)),
                    );
                  }}
                  type="text"
                />
                <FontAwesomeIcon
                  fontSize="15px"
                  icon={faX}
                  className={styles.removeLink}
                  onClick={() => {
                    setLinks((prev) => prev.filter((el, id) => id !== index));
                  }}
                />
              </div>
            ))}
          </div>
          {hasDeadline && !isAssignedUser && (
            <input
              type="date"
              className={styles.inputDate}
              value={deadline.slice(0, 10)}
              onChange={(e) => setDeadline(e.target.value)}
            />
          )}
          <div className={styles.checkBox}>
            <Checkbox
              isChecked={isCompleted}
              callback={onChangeCheckBoxIsCompleted}
              label={t('taskCompleted')}
            />
          </div>

          <div className={styles.actions}>
            <Button text={t('cancel')} callback={cancel} class="cancel" />
            <Button
              text={t('submit')}
              callback={submit}
              class="submit"
              disabled={
                description.length < 3 ||
                title.length < 3 ||
                (isForSubtask && !assigner)
              }
            />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskForm;
