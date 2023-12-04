import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SubTasks from './SubTasks/SubTasks';
import { Task } from '../../../../api/taskAPI';
import { humaniseDate } from '../../../../helpers/string';

import styles from './TaskInfo.module.scss';

interface TaskInfoProps {
  childProps: Task;
}

const TaskInfo: FC<TaskInfoProps> = ({ childProps }) => {
  const {
    title,
    description,
    categories,
    deadline,
    isCompleted,
    sharedWith,
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
        {isCompleted ? 'Completed' : 'In progress'}
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

      {subtasks ? <SubTasks subTasks={subtasks} /> : null}

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
      {sharedWith &&
        sharedWith[0] !== 'already shared' &&
        sharedWith.length > 0 && (
          <>
            <h5 className={styles.sharedTitle}>{t('sharedWith')}:</h5>
            <div className={styles.sharedWrapper}>
              {sharedWith.map((el, id) => (
                <p className={styles.username} key={id}>
                  {typeof el !== 'string' && el.username}
                </p>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default TaskInfo;
