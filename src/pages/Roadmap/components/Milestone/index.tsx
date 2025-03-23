import { FC, useRef, useState } from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch } from '../../../../hooks';
import {
  setRoadmapCurrentMilestone,
  setRoadmapIsDeletingMilestoneOpened,
  setRoadmapIsEditingMilestoneOpened,
  updateMilestonePosition,
} from '../../../../redux/slices/roadmap/roadmap';
import { Milestone } from '../../../../redux/slices/roadmap/type';

import styles from './styles.module.scss';

interface MilestoneProps {
  milestone: Milestone;
  totalQuarters: number;
}

const MilestoneComponent: FC<MilestoneProps> = ({
  milestone,
  totalQuarters,
}) => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState(milestone.position);
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startPosition: number;
  }>({
    dragging: false,
    startX: 0,
    startPosition: milestone.position,
  });

  const roadmapWidth = 300 * totalQuarters;
  const maxPosition = totalQuarters * 100;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startPosition: position,
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragStateRef.current.dragging) return;

    const deltaPx = e.clientX - dragStateRef.current.startX;
    const deltaValue = (deltaPx / roadmapWidth) * maxPosition;
    const newPos = Math.round(dragStateRef.current.startPosition + deltaValue);

    if (newPos >= 5 && newPos <= maxPosition - 1) {
      setPosition(newPos);
    }
  };

  const onMouseUp = () => {
    dragStateRef.current.dragging = false;

    dispatch(updateMilestonePosition({ id: milestone.id, position }));

    // 📡 API example
    // await api.updateMilestone(milestone.id, { position });

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const handleEditMilestoneOpenModal = (milestone: Milestone) => {
    dispatch(setRoadmapCurrentMilestone(milestone));
    dispatch(setRoadmapIsEditingMilestoneOpened(true));
  };

  const handleDeleteMilestoneOpenModal = (milestone: Milestone) => {
    dispatch(setRoadmapCurrentMilestone(milestone));
    dispatch(setRoadmapIsDeletingMilestoneOpened(true));
  };

  return (
    <div
      className={styles.milestone}
      style={{ left: `${position / totalQuarters}%` }}
    >
      <div className={styles.milestoneContent}>
        <div className={styles.dragHandle} onMouseDown={onMouseDown} />
        <p>{milestone.title}</p>
      </div>
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            handleEditMilestoneOpenModal(milestone);
            e.stopPropagation();
          }}
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            handleDeleteMilestoneOpenModal(milestone);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default MilestoneComponent;
