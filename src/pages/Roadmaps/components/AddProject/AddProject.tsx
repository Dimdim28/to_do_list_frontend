import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI, {
  RoadMapProjectShortInfo,
} from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import Preloader from '../../../../components/Preloader/Preloader';
import { Status } from '../../../../types/shared';
import { ProjectDescriptionTextArea } from '../ProjectDescriptionTextArea/ProjectDescriptionTextArea';

import styles from './AddProject.module.scss';

const EditProjectInfo: FC<{
  toggleActive: () => void;
  childProps: {
    isOpened: boolean;
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
}> = ({ toggleActive, childProps }) => {
  const { t } = useTranslation();

  const setProjects = childProps.setAllProjects;
  const projectInfo = childProps.currentProject;
  const isOpened = childProps.isOpened;

  const [title, setTitle] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(
    projectInfo?.description || '',
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {};

  const handleSubmit = async () => {
    if (!projectInfo) {
      setIsLoading(true);

      const result = await roadmapAPI.createBoard({
        title,
        description,
      });

      if (result.status === Status.SUCCESS) {
        setProjects((prev) => [...prev, result.data]);
        setError('');
        setIsLoading(false);
        toggleActive();
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const result = await roadmapAPI.updateBoard({
        boardId: projectInfo._id,
        description,
        title,
      });

      if (result.status === Status.SUCCESS) {
        setProjects((prev) =>
          prev.map((el) =>
            el._id === projectInfo._id
              ? { ...projectInfo, title, description }
              : el,
          ),
        );
        setError('');
        setIsLoading(false);
        toggleActive();
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setTitle(projectInfo?.title || '');
    setDescription(projectInfo?.description || '');
  }, [projectInfo, isOpened]);

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={styles.title}>{t('title')}</div>
        <SimpleInput
          value={title}
          setValue={setTitle}
          placeholder={t('projectTitle')}
          type="text"
        />
      </div>

      <div className={styles.block}>
        <div className={styles.title}>{t('description')}</div>
        <ProjectDescriptionTextArea
          value={description}
          setValue={setDescription}
          placeholder={t('projectDescription')}
          type="text"
        />
      </div>

      <div className={styles.buttons}>
        <Button
          text={t('cancel')}
          class="cancel"
          callback={handleCancel}
        ></Button>
        <Button
          text={t('submit')}
          class="submit"
          callback={handleSubmit}
        ></Button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditProjectInfo;
