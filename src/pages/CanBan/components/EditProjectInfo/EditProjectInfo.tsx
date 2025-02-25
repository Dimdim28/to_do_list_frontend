import { useEffect, useState } from 'react';

import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditProjectModalOpened,
  setProjectInfo,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectIsProjectSettingsOpened,
} from '../../../../redux/slices/canban/selectors';

import { ProjectDescriptionTextArea } from './components/ProjectDescriptionTextArea/ProjectDescriptionTextArea';

import styles from './EditProjectInfo.module.scss';

const EditProjectInfo = () => {
  const projectInfo = useAppSelector(selectIsProjectInfo);
  const isOpened = useAppSelector(selectIsProjectSettingsOpened);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(projectInfo.title);
  const [description, setDescription] = useState(projectInfo.description);

  const handleClose = () => {
    dispatch(setEditProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };
  const handleSubmit = () => {
    handleClose();
    dispatch(setProjectInfo({ title, description }));
  };

  useEffect(() => {
    setTitle(projectInfo.title);
    setDescription(projectInfo.description);
  }, [projectInfo, isOpened]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={styles.title}>Title</div>
        <SimpleInput
          value={title}
          setValue={setTitle}
          placeholder="project title"
          type="text"
        />
      </div>

      <div className={styles.block}>
        <div className={styles.title}>Description</div>
        <ProjectDescriptionTextArea
          value={description}
          setValue={setDescription}
          placeholder="project description"
          type="text"
        />
      </div>

      <div className={styles.buttons}>
        <Button text="Cancel" class="cancel" callback={handleCancel}></Button>
        <Button text="Submit" class="submit" callback={handleSubmit}></Button>
      </div>
    </div>
  );
};

export default EditProjectInfo;
