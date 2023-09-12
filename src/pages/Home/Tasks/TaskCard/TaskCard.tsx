import { useState, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Task, getTask } from "../../../../api/taskAPI";
import { humaniseDate, truncate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";

import styles from "./TaskCard.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faShare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface taskProps {
  task: Task;
  setTaskEditing: Dispatch<SetStateAction<boolean>>;
  setTaskProps: Dispatch<
    SetStateAction<
      | {}
      | (Task & {
          fetchTasks: (params: getTask) => void;
          taskFetchingParams: getTask;
        })
    >
  >;
  setTaskDeleting: Dispatch<SetStateAction<boolean>>;
  setTaskSharing: Dispatch<SetStateAction<boolean>>;
  setTaskAddingLink: Dispatch<SetStateAction<boolean>>;
  setTaskInfo: Dispatch<SetStateAction<boolean>>;
  fetchTasks: (params: getTask) => void;
  taskFetchingParams: getTask;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  length?: number;
}

const TaskCard = ({
  task,
  setTaskEditing,
  setTaskProps,
  setTaskDeleting,
  setTaskSharing,
  setTaskAddingLink,
  setTaskInfo,
  fetchTasks,
  taskFetchingParams,
  setCurrentPage,
  length,
}: taskProps) => {
  const {
    title,
    description,
    deadline,
    isCompleted,
    categories,
    _id,
    sharedWith,
    links,
  } = task;

  const { t } = useTranslation();

  const [completed, setIsCompleted] = useState(isCompleted || false);

  return (
    <div
      className={completed ? styles.completedWrapper : styles.wrapper}
      onClick={() => {
        setTaskProps(task);
        setTaskInfo(true);
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isForChangeCompletedStatus
          isChecked={completed}
          label=""
          data-testid="checkbox"
          setIsChecked={setIsCompleted}
          isRounded
          id={_id}
        />
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
      <p className={styles.description}>{truncate(description, 80)}</p>
      <div className={styles.links}>
        {links && links.length > 0 && (
          <p className={styles.link}>
            {t("linksAttacked")}: {links.length}
          </p>
        )}
      </div>

      {deadline && (
        <p className={styles.deadline}>Deadline: {humaniseDate(deadline)}</p>
      )}
      {sharedWith &&
        sharedWith[0] !== "already shared" &&
        sharedWith.length > 0 && (
          <div className={styles.username}>
            {t("sharedWith")}: {sharedWith.length}
          </div>
        )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="edit-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          data-testid="attach-icon"
          className={`${styles.icon} ${styles.attach}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskAddingLink(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPlus}
        />
        <FontAwesomeIcon
          color="black"
          data-testid="delete-icon"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setTaskProps({
              ...task,
              fetchTasks,
              taskFetchingParams,
              setCurrentPage,
              length,
            });
            setTaskDeleting(true);
            e.stopPropagation();
          }}
        />
        <FontAwesomeIcon
          color="black"
          data-testid="share-icon"
          fontSize="15px"
          icon={faShare}
          className={`${styles.icon} ${styles.share}`}
          onClick={(e) => {
            if (sharedWith && sharedWith[0] === "already shared") {
              toast.error(
                "You are not the author of this task, you can not share this task!"
              );
              return;
            }
            setTaskProps({
              ...task,
              fetchTasks,
              taskFetchingParams,
            });
            setTaskSharing(true);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
