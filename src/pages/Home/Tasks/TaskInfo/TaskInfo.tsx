import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SubTasks from './SubTasks/SubTasks';
import { humaniseDate } from '../../../../helpers/string';

import styles from './TaskInfo.module.scss';
import { SubTask } from '../../../../types/entities/SubTask';
import { Task } from '../../../../types/entities/Task';

interface TaskInfoProps {
  childProps: Task & {
    setSubTasksArray?: SubTask[];
  };
}

const TaskInfo: FC<TaskInfoProps> = ({ childProps }) => {
  const {
    _id,
    title,
    description,
    categories,
    deadline,
    isCompleted,
    links,
    subtasks,
  } = childProps;

  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p
        className={
          isCompleted ? styles.statusCompleted : styles.statusInProgress
        }
      >
        {isCompleted ? t('completed') : t('inProgress')}
      </p>
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
      </div>
      <div className={styles.categoriesWrapper}>
        {categories?.map((el) => {
          const { color, title } = el;
          return (
            <span
              key={el._id}
              style={{ borderColor: color }}
              className={styles.category}
            >
              {title}
            </span>
          );
        })}
      </div>
      <p className={styles.description}>{description}</p>

      {subtasks?.length > 0 ? (
        <SubTasks subTasks={subtasks} taskId={_id} />
      ) : null}

      <div className={styles.links}>
        {links?.map((link, id) => (
          <a href={link} key={id} target="blank" className={styles.link}>
            {link}
          </a>
        ))}
      </div>

      {deadline && (
        <p className={styles.deadline}>
          {t('deadline')} {humaniseDate(deadline)}
        </p>
      )}
    </div>
  );
};

export default TaskInfo;
