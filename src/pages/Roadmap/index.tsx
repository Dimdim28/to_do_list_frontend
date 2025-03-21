import Preloader from '../../components/Preloader/Preloader';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppSelector } from '../../hooks';
import {
  selectRoadmapData,
  selectRoadmapMessage,
  selectRoadmapStatus,
} from '../../redux/slices/roadmap/selectors';
import { Status } from '../../types/shared';

import styles from './styles.module.scss';

const RoadMap = () => {
  const data = useAppSelector(selectRoadmapData);
  const status = useAppSelector(selectRoadmapStatus);
  const message = useAppSelector(selectRoadmapMessage);

  if (status === Status.LOADING) return <Preloader />;
  if (!data) return <div className={styles.error}>{message}</div>;

  const { title, categories, milestones, quarters } = data;

  const totalQuarters = quarters.length;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.projectTitle}>{title}</h1>

      <div
        className={styles.roadmap}
        style={{ minWidth: `${210 + totalQuarters * 300}px` }}
      >
        <div className={styles.quarterLines}>
          {quarters.map((quarter, index) =>
            index > 0 ? (
              <div
                key={quarter.id}
                className={styles.quarterLine}
                style={{
                  left: `${(index / totalQuarters) * 100}%`,
                }}
              />
            ) : null,
          )}
        </div>
        <div className={styles.lineWrapper}>
          <div className={styles.category}></div>
          <div className={styles.blocks}>
            <div className={styles.quarteers}>
              {quarters.map((quarteer) => (
                <div
                  key={quarteer.id}
                  className={styles.quarteer}
                  style={{ width: `${100 / totalQuarters}%` }}
                >
                  {quarteer.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.lineWrapper}>
          <div
            className={styles.category}
            style={{
              backgroundColor: '#4066FE',
            }}
          >
            Milestones
          </div>
          <div className={styles.blocks}>
            <div className={styles.milestonesRow}>
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={styles.milestone}
                  style={{ left: `${milestone.position / totalQuarters}%` }}
                >
                  {milestone.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className={styles.lineWrapper}>
            <div
              className={styles.category}
              style={{
                backgroundColor: category.color,
              }}
            >
              {category.title}
            </div>

            <div className={`${styles.blocks} ${styles.rows}`}>
              {category.rows.map((row) => (
                <div key={row.id} className={styles.row}>
                  {row.tasks.map((task) => (
                    <div
                      className={styles.task}
                      key={task.id}
                      style={{
                        backgroundColor: category.color,
                        left: `${task.start / totalQuarters}%`,
                        right: `${
                          (totalQuarters * 100 - task.end) / totalQuarters
                        }%`,
                      }}
                    >
                      <div className={styles.taskTitle}> {task.title}</div>
                      <div
                        className={styles.taskProgress}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLoginRedirect(RoadMap);
