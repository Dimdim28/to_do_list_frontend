import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import { Modal } from '../../../../components/common/Modal/Modal';
import { SimpleInput } from '../../../../components/common/SimpleInput/SimpleInput';
import Preloader from '../../../../components/Preloader/Preloader';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import {
  removeTagFromList,
  removeUserFromProject,
  setEditProjectModalOpened,
  setProjectInfo,
  updateTagInList,
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
import { Status, User } from '../../../../types/shared';
import DeleteTag from '../DeleteTagModal/DeleteTag';
import DeleteUser from '../DeleteUserModal/DeleteUser';
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
  const [deletingTagModalOpened, setDeletingTagModalOpened] =
    useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deletingUserModalOpened, setDeletingUserModalOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    dispatch(setEditProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

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
        dispatch(
          setProjectInfo({
            id: projectInfo?.id || `${Math.random() * 1000}`,
            title,
            description,
          }),
        );
        setError('');
        setIsLoading(false);
        handleClose();
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }
  };

  const updateTag = (tag: TagType) => {
    setCurrentTags((tags) =>
      tags.map((currentTag) => (currentTag._id === tag._id ? tag : currentTag)),
    );
    dispatch(updateTagInList(tag));
  };

  const deleteTag = (tag: TagType) => {
    setCurrentTags((tags) =>
      tags.filter((currentTag) => currentTag._id !== tag._id),
    );
    dispatch(removeTagFromList(tag._id));
  };

  const deleteUser = (currentUser: User) => {
    setCurrentMembers((members) =>
      members.filter((user) => user._id !== currentUser._id),
    );
    dispatch(removeUserFromProject(currentUser._id));
  };

  useEffect(() => {
    setTitle(projectInfo?.title || '');
    setDescription(projectInfo?.description || '');
    setCurrentMembers(members);
    setCurrentTags(tags);
  }, [projectInfo, isOpened, members, tags]);

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
                  setDeletingUser(el);
                  setDeletingUserModalOpened(true);
                }}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.tags}>
        {currentTags.map((tag) => (
          <Tag
            key={tag._id}
            tag={tag}
            editTag={(tag) => {
              setEditingTag(tag);
              setEditingTagModalOpened(true);
            }}
            removeTag={(tag) => {
              setDeletingTagModalOpened(true);
              setEditingTag(tag);
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

      <Modal
        active={deletingTagModalOpened}
        setActive={() => {
          setDeletingTagModalOpened(false);
          setEditingTag(null);
        }}
        ChildComponent={DeleteTag}
        childProps={{ tag: editingTag, deleteTag }}
      />

      <Modal
        active={deletingUserModalOpened}
        setActive={() => {
          setDeletingUserModalOpened(false);
          setDeletingUser(null);
        }}
        ChildComponent={DeleteUser}
        childProps={{ user: deletingUser, deleteUser }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditProjectInfo;
