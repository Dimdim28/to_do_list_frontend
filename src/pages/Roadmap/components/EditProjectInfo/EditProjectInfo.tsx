import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../../components/common/Button/Button';
import { Modal } from '../../../../components/common/Modal/Modal';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppSelector } from '../../../../hooks';
import { selectProfile } from '../../../../redux/slices/auth/selectors';
import ROUTES from '../../../../routes';
import { User } from '../../../../types/shared';
import DeleteUser from '../DeleteUserModal/DeleteUser';

import styles from './EditProjectInfo.module.scss';

const EditProjectInfo: FC<{
  childProps: { members: User[]; projectId: string };
  toggleActive: Dispatch<SetStateAction<boolean>>;
}> = ({ toggleActive, childProps }) => {
  const members = childProps.members;
  const currentUserProfile = useAppSelector(selectProfile);

  const { t } = useTranslation();

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deletingUserModalOpened, setDeletingUserModalOpened] = useState(false);

  const handleCancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.members}>
        {members.map((el) => (
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

      <div className={styles.buttons}>
        <Button
          text={t('cancel')}
          class="cancel"
          callback={handleCancel}
        ></Button>
      </div>

      <Modal
        active={deletingUserModalOpened}
        setActive={() => {
          setDeletingUserModalOpened(false);
          setDeletingUser(null);
        }}
        ChildComponent={DeleteUser}
        childProps={{
          user: deletingUser,
          projectId: childProps.projectId,
        }}
      />
    </div>
  );
};

export default EditProjectInfo;
