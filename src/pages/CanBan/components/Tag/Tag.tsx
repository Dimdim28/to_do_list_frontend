import { FC } from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tag as TagType } from '../../../../redux/slices/canban/type';

import styles from './Tag.module.scss';

interface TagProps {
  tag: TagType;
  tagClick?: (tag: TagType) => void;
  editTag?: (tag: TagType) => void;
  removeTag?: (tag: TagType) => void;
}

const Tag: FC<TagProps> = ({ tag, tagClick, editTag, removeTag }) => {
  return (
    <div
      style={{ borderColor: tag.color }}
      className={`${styles.tag} ${tagClick ? styles.hoverable : undefined}`}
      onClick={() => {
        if (tagClick) tagClick(tag);
      }}
    >
      {tag.title}

      <div className={styles.icons}>
        {editTag ? (
          <FontAwesomeIcon
            data-testid="pencil-icon"
            className={`${styles.icon} ${styles.pencil}`}
            onClick={(e) => {
              editTag(tag);
              e.stopPropagation();
            }}
            color="black"
            fontSize="15px"
            icon={faPencil}
          />
        ) : null}

        {removeTag ? (
          <FontAwesomeIcon
            data-testid="trash-icon"
            color="black"
            fontSize="15px"
            icon={faTrash}
            className={`${styles.icon} ${styles.trash}`}
            onClick={(e) => {
              removeTag(tag);

              e.stopPropagation();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Tag;
