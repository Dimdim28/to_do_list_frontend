import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../components/common/Button/Button';
import { Modal } from '../../../../components/common/Modal/Modal';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import {
  deleteTagFromColumns,
  deleteUserFromColumns,
  editTagInColumns,
  setEditProjectModalOpened,
  setProjectInfo,
  updateTags,
  updateUsersInProject,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectIsProjectSettingsOpened,
  selectProjectMembers,
  selectProjectTags,
} from '../../../../redux/slices/canban/selectors';
import { createCanBanBoard } from '../../../../redux/slices/canban/thunk';
import { Tag as TagType } from '../../../../redux/slices/canban/type';
import ROUTES from '../../../../routes';
import EditTagProjectModal from '../EditTagProjectModal/EditTagProjectModal';
import Tag from '../Tag/Tag';

import { ProjectDescriptionTextArea } from './components/ProjectDescriptionTextArea/ProjectDescriptionTextArea';

import styles from './EditProjectInfo.module.scss';

const EditProjectInfo = () => {
  const projectInfo = useAppSelector(selectIsProjectInfo);
  const isOpened = useAppSelector(selectIsProjectSettingsOpened);
  const members = useAppSelector(selectProjectMembers);
  const tags = useAppSelector(selectProjectTags);
  const currentUserProfile = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  const [title, setTitle] = useState(projectInfo?.title || '');
  const [description, setDescription] = useState(
    projectInfo?.description || '',
  );
  const [currentMembers, setCurrentMembers] = useState(members);
  const [currentTags, setCurrentTags] = useState(tags);

  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [editingTagModalOpened, setEditingTagModalOpened] =
    useState<boolean>(false);

  const handleClose = () => {
    dispatch(setEditProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = () => {
    if (!projectInfo) {
      dispatch(
        createCanBanBoard({
          title,
          description,
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
      dispatch(updateTags(currentTags));

      const deletedMembers = members.filter(
        (member) =>
          !currentMembers.some(
            (currentMember) => currentMember._id === member._id,
          ),
      );
      deletedMembers
        .map((member) => member._id)
        .forEach((memberId) => {
          dispatch(deleteUserFromColumns(memberId));
        });
    }
    const deletedTags: string[] = [];
    const editadTags: TagType[] = [];

    tags.forEach((tag) => {
      const tagInCurrentTags = currentTags.find(
        (currTag) => currTag.id === tag.id,
      );
      if (tagInCurrentTags) {
        if (
          tag.color !== tagInCurrentTags.color ||
          tag.text !== tagInCurrentTags.text
        ) {
          editadTags.push(tagInCurrentTags);
        }
      } else {
        deletedTags.push(tag.id);
      }
    });

    deletedTags.forEach((deletedTag) => {
      dispatch(deleteTagFromColumns(deletedTag));
    });

    editadTags.forEach((editedTag) => {
      dispatch(editTagInColumns(editedTag));
    });

    handleClose();
  };

  const updateTag = (tag: TagType) => {
    setCurrentTags((tags) =>
      tags.map((currentTag) => (currentTag.id === tag.id ? tag : currentTag)),
    );
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

      <div className={styles.members}>
        {currentMembers.map((el) => (
          <div className={styles.user} key={el._id}>
            <UserImage
              user={el}
              onAvatarClick={(user) => goToProfile(user._id)}
            />
            <p className={styles.text}>{el.username}</p>
            {currentUserProfile?._id !== el._id ? (
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
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.tags}>
        {currentTags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            editTag={(tag) => {
              setEditingTag(tag);
              setEditingTagModalOpened(true);
            }}
            removeTag={(tag) => {
              setCurrentTags((tags) =>
                tags.filter((currentTag) => currentTag.id !== tag.id),
              );
            }}
          />
        ))}
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
      <Modal
        active={editingTagModalOpened}
        setActive={() => {
          setEditingTagModalOpened(false);
          setEditingTag(null);
        }}
        ChildComponent={EditTagProjectModal}
        childProps={{ tag: editingTag, updateTag }}
      />
    </div>
  );
};

export default EditProjectInfo;
