import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectIsProjectInfo,
  selectIsProjectSettingsOpened,
} from '../../../../redux/slices/canban/selectors';
import { createCanBanBoard } from '../../../../redux/slices/canban/thunk';
import { Status } from '../../../../types/shared';
import { ProjectDescriptionTextArea } from '../ProjectDescriptionTextArea/ProjectDescriptionTextArea';

import styles from './AddProject.module.scss';

const EditProjectInfo: FC<{
  toggleActive: () => void;
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
  };
}> = ({ toggleActive, childProps }) => {
  const projectInfo = useAppSelector(selectIsProjectInfo);
  const isOpened = useAppSelector(selectIsProjectSettingsOpened);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setProjects = childProps.setAllProjects;

  const [title, setTitle] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(
    projectInfo?.description || '',
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {};

  const handleSubmit = async () => {
    if (!projectInfo) {
      dispatch(
        createCanBanBoard({
          title,
          description,
        }),
      );
    } else {
      setIsLoading(true);
      const result = await canbanAPI.updateBoard({
        boardId: projectInfo.id,
        description,
        title,
      });

      if (result.status === Status.SUCCESS) {
        toggleActive();

        setProjects((prev) => [
          ...prev,
          {
            _id: projectInfo?.id || `${Math.random() * 1000}`,
            title,
            description,
            creatorId: '',
            membersCount: 1,
          },
        ]);
        setError('');
        setIsLoading(false);
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
