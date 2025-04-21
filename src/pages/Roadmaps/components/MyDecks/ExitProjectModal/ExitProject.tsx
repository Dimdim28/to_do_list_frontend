import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI, {
  RoadMapProjectShortInfo,
} from '../../../../../api/roadmapApi';
import Button from '../../../../../components/common/Button/Button';
import Preloader from '../../../../../components/Preloader/Preloader';
import { truncate } from '../../../../../helpers/string';
import { Status } from '../../../../../types/shared';

import styles from './ExitProject.module.scss';

interface ExitProjectProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    setAllProjects: Dispatch<
      SetStateAction<
        {
          membersCount: number;
          creatorId: string;
          description: string;
          title: string;
          _id: string;
        }[]
      >
    >;
    currentProject: RoadMapProjectShortInfo | null;
  };
}
const ExitProject: FC<ExitProjectProps> = ({ toggleActive, childProps }) => {
  const { t } = useTranslation();
  const setAllProjects = childProps.setAllProjects;

  const title = childProps.currentProject?.title;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancel = () => {
    toggleActive(false);
  };

  const submit = async () => {
    const currentProject = childProps.currentProject;

    if (!currentProject || !currentProject._id) return;

    setIsLoading(true);

    const result = await roadmapAPI.leaveRoadmap(currentProject._id);
    if (result.status === Status.SUCCESS) {
      setAllProjects((prev) =>
        prev.filter((el) => el._id !== currentProject._id),
      );
      setError('');
      setIsLoading(false);
      toggleActive(false);
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t('sureExitProject')}</p>
        <h3>{truncate(title, 12)}?</h3>
      </div>

      <div className={styles.actions}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button text={t('submit')} callback={submit} class="submit" />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ExitProject;
