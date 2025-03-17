import { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../components/common/Button/Button';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addProjectToList,
  setEditProjectModalOpened,
  setProjectInfo,
  updateUsersInProject,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectIsProjectSettingsOpened,
  selectProjectMembers,
  selectProjectTags,
} from '../../../../redux/slices/canban/selectors';
import ROUTES from '../../../../routes';
import Tag from '../Tag/Tag';

import { ProjectDescriptionTextArea } from './components/ProjectDescriptionTextArea/ProjectDescriptionTextArea';

import styles from './EditProjectInfo.module.scss';

const EditProjectInfo = () => {
  const projectInfo = useAppSelector(selectIsProjectInfo);
  const isOpened = useAppSelector(selectIsProjectSettingsOpened);
  const members = useAppSelector(selectProjectMembers);
  const tags = useAppSelector(selectProjectTags);

  const dispatch = useAppDispatch();

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  const [title, setTitle] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(
    projectInfo?.description || '',
  );
  const [currentMembers, setCurrentMembers] = useState(members);
  const [currentTags, setCurrentTags] = useState(tags);

  const handleClose = () => {
    dispatch(setEditProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = () => {
    if (!projectInfo) {
      dispatch(
        addProjectToList({
          title,
          description,
          id: `${Math.random() * 1000}`,
          membersCount: 0,
        }),
      );
    } else {
      dispatch(
        setProjectInfo({
          id: projectInfo?.id || `${Math.random() * 1000}`,
          title,
          description,
        }),
      );
      dispatch(updateUsersInProject(currentMembers));
    }

    handleClose();
  };

  useEffect(() => {
    setTitle(projectInfo?.title || '');
    setDescription(projectInfo?.description || '');
    setCurrentMembers(members);
    setCurrentTags(tags);
  }, [projectInfo, isOpened, members, tags]);

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

      <div className={styles.members}>
        {currentMembers.map((el) => (
          <div className={styles.user} key={el._id}>
            <UserImage
              user={el}
              onAvatarClick={(user) => goToProfile(user._id)}
            />
            <p className={styles.text}>{el.username}</p>

            <FontAwesomeIcon
              fontSize="15px"
              icon={faTrash}
              className={styles.trash}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentMembers((members) =>
                  members.filter((user) => user._id !== el._id),
                );
              }}
            />
          </div>
        ))}
      </div>

      <div className={styles.tags}>
        {currentTags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            editTag={(tag) => {
              console.log(tag);
            }}
            removeTag={(tag) => {
              setCurrentTags((tags) =>
                tags.filter((curentTag) => curentTag.id !== tag.id),
              );
            }}
          />
        ))}
      </div>

      <div className={styles.buttons}>
        <Button text="Cancel" class="cancel" callback={handleCancel}></Button>
        <Button text="Submit" class="submit" callback={handleSubmit}></Button>
      </div>
    </div>
  );
};

export default EditProjectInfo;
