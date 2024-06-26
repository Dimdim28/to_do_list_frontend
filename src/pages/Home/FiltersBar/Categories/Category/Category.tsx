import { useState, Dispatch, SetStateAction, FC } from 'react';

import { getTask } from '../../../../../api/taskAPI';

import styles from './Category.module.scss';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  isForTask?: boolean;
  setCategoryEditing: Dispatch<SetStateAction<boolean>>;
  setCategoryDeleting: Dispatch<SetStateAction<boolean>>;
  setCategoryInfo: Dispatch<SetStateAction<{}>>;
  setActiveCategories: Dispatch<SetStateAction<string[]>>;
  isActive: boolean;
  taskFetchingParams: getTask;
}

const Category: FC<CategoryProps> = ({
  setCategoryInfo,
  setCategoryDeleting,
  setCategoryEditing,
  setActiveCategories,
  isForTask,
  isActive,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      data-testid="category-element"
      onClick={() => {
        if (isActive) {
          setActiveCategories((prev) => prev.filter((el) => el !== props._id));
        } else {
          setActiveCategories((prev) => [...prev, props._id]);
        }
      }}
      className={isForTask ? styles.tasksFormCategory : styles.category}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ borderColor: hover || isActive ? '#f97316' : props.color }}
    >
      <span className={isActive ? styles.activeTitle : styles.title}>
        {props.title}
      </span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="pencil-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setCategoryInfo(props);
            setCategoryEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          data-testid="trash-icon"
          color="black"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setCategoryInfo(props);
            setCategoryDeleting(true);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default Category;
