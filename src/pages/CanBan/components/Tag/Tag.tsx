import { FC } from 'react';

import { Tag as TagType } from '../../../../redux/slices/canban/type';

import styles from './Tag.module.scss';

interface TagProps {
  tag: TagType;
  tagClick?: (tag: TagType) => void;
}

const Tag: FC<TagProps> = ({ tag, tagClick }) => {
  return (
    <div
      style={{ borderColor: tag.color }}
      className={`${styles.tag} ${tagClick ? styles.hoverable : undefined}`}
      onClick={() => {
        if (tagClick) tagClick(tag);
      }}
    >
      {tag.text}
    </div>
  );
};

export default Tag;
