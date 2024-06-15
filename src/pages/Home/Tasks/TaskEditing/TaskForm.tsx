import { useState, Dispatch, SetStateAction, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import Categories from '../../FiltersBar/Categories/Categories';
import { Input } from '../../../../components/common/Input/Input';
import { Checkbox } from '../../../../components/common/Checkbox/Checkbox';
import { TextArea } from '../../../../components/common/TextArea/TextArea';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import { Status } from '../../../../types';
import taskAPI, { Task, getTask } from '../../../../api/taskAPI';
import subTasksAPI, { SubTask } from '../../../../api/subTaskAPI';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import ChosenUser from '../ChosenUser/ChosenUser';
import { User } from '../../../../api/userAPI';

import styles from './TaskForm.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { humaniseDate, truncate } from '../../../../helpers/string';
import { fetchTasks } from '../../../../redux/slices/home/thunk';
import { updateTaskCurrentPage } from '../../../../redux/slices/home/home';

interface TaskFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    taskFetchingParams: getTask;
    length: number;
    isForSubtask?: boolean;
    assigneeId?: User | null;
    setSubTasksArray?: Dispatch<SetStateAction<SubTask[]>>;
    isAssignedUser?: boolean;
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
    taskFetchingParams,
    length,
    isForSubtask,
    assigneeId,
    setSubTasksArray,
    isAssignedUser,
  } = childProps;

  console.log('props =', childProps);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');
  const [title, setTittle] = useState(prevTitle || '');
  const [description, setDescription] = useState(prevDescription || '');
  const [categories, setCategories] = useState(
    prevCategories?.map((el) => el._id) || [],
  );
  const [hasDeadline, setHasDeadline] = useState(!!prevDeadline);
  const [deadline, setDeadline] = useState(prevDeadline || '');
  const [isCompleted, setIsCompleted] = useState(prevIscompleted || false);
  const [links, setLinks] = useState([...(prevLinks || [])]);
  const [assigner, setAssigner] = useState<User | null>(assigneeId || null);

  const profile = useAppSelector(selectProfile);

  const userId = profile?._id || '';
  const avatar = profile?.avatar || {
    url: 'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg',
    public_id: '',
  };
  const username = profile?.username || '';

  const submit = async () => {
    setStatus(Status.LOADING);
    let payload = { title, description, links: links || [] };
    payload = Object.assign(payload, {
      deadline: hasDeadline ? deadline : null,
    });
    if (categories.length >= 0)
      payload = Object.assign(payload, {
        categories,
      });
    if ([false, true].includes(isCompleted))
      payload = Object.assign(payload, { isCompleted });

    let result;

    if (isAssignedUser) {
      result = await subTasksAPI.editSubTask({
        subTaskId: _id,
        links,
        categories,
        isCompleted,
      });
    } else if (isForSubtask) {
      if (assigneeId) {
        result = await subTasksAPI.editSubTask({
          subTaskId: _id,
          title,
          description,
          deadline: hasDeadline ? deadline : null,
          isCompleted,
          assigneeId: assigner?._id || '',
        });
      } else {
        result = await subTasksAPI.createSubTask({
          taskId: _id,
          title,
          description,
          deadline: hasDeadline ? deadline : null,
          isCompleted,
          assigneeId: assigner?._id || '',
        });
      }
    } else {
      result = _id
        ? await taskAPI.edittask({ _id, ...payload })
        : await taskAPI.addtask({ user: userId, ...payload });
    }

    if (isForSubtask && _id && setSubTasksArray) {
      const typedAssigner = assigner as User;
      setSubTasksArray((prev) =>
        prev.map((el) =>
          el._id === _id
            ? {
                ...el,
                title,
                description,
                deadline,
                isCompleted,
                assigneeId: {
                  _id: typedAssigner._id,
                  avatar: {
                    url: typedAssigner.avatar?.url || '',
                    public_id: typedAssigner.avatar?.public_id || '',
                  },
                  username: typedAssigner.username,
                },
              }
            : el,
        ),
      );
    }
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      if (!_id && length === 10 && !isForSubtask) {
        dispatch(updateTaskCurrentPage((taskFetchingParams.page || 0) + 1));
      } else {
        dispatch(fetchTasks(taskFetchingParams));
      }
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
              taskFetchingParams={taskFetchingParams}
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
