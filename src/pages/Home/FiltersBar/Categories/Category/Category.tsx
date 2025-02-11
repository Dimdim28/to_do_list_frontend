import { Dispatch, FC, SetStateAction, useState } from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch } from '../../../../../hooks';
import { updateTaskCurrentPage } from '../../../../../redux/slices/home/home';
import { Category as CategoryType } from '../../../../../types/entities/Category';

import styles from './Category.module.scss';

export interface CategoryProps {
  _id: string;
  title: string;
  color: string;
  key: number;
  isForTask?: boolean;
  setCategoryEditing: Dispatch<SetStateAction<boolean>>;
  setCategoryDeleting: Dispatch<SetStateAction<boolean>>;
  setCategoryInfo: Dispatch<SetStateAction<object>>;
  setActiveCategories: (categories: CategoryType[]) => void;
  activeCategories: CategoryType[];
  isActive: boolean;
}

const Category: FC<CategoryProps> = ({
  setCategoryInfo,
  setCategoryDeleting,
  setCategoryEditing,
  setActiveCategories,
  activeCategories,
  isForTask,
  isActive,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();

  const typedSetActiveCategories = setActiveCategories as Dispatch<
    SetStateAction<CategoryType[]>
  >;

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
          if (isForTask) {
            typedSetActiveCategories((prev) =>
              prev.filter((el) => el._id !== props._id),
            );
            dispatch(updateTaskCurrentPage(1));
          } else {
            setActiveCategories(
              activeCategories.filter((el) => el._id !== props._id),
            );
          }
        } else {
          if (isForTask) {
            typedSetActiveCategories((prev) => [
              ...prev,
              { _id: props._id, color: props.color, title: props.title },
            ]);
            dispatch(updateTaskCurrentPage(1));
          } else {
            setActiveCategories([
              ...activeCategories,
              { _id: props._id, color: props.color, title: props.title },
            ]);
          }
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
