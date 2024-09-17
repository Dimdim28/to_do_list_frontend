import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/common/Button/Button';
import { Modal } from '../../../components/common/Modal/Modal';
import { useAppSelector } from '../../../hooks';
import { selectIsAdmin } from '../../../redux/slices/auth/selectors';
import { selectIsUserBanned } from '../../../redux/slices/profile/selectors';
import { ChangeAvatarEffect } from '../ChangeEvatarEffect/ChangeAvatarEffect';

import Avatar from './Avatar/Avatar';
import Buttons from './Buttons/Buttons';
import DeleteProfile from './DeleteProfile/DeleteProfile';
import Exit from './Exit/Exit';
import Name from './Name/Name';
import ProfileData from './ProfileData/ProfileData';

import styles from './ProfileCard.module.scss';
import adminAPI from '../../../api/adminApi';

interface ProfileCardProps {
  isNameEditing: boolean;
  setIsNameEditing: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  id: string;
  ownerId: string;
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
  setIspassEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDeleting: React.Dispatch<React.SetStateAction<boolean>>;

  isAccountDeleting: boolean;
  isExiting: boolean;
}

const ProfileCard: FC<ProfileCardProps> = ({
  isNameEditing,
  setIsNameEditing,
  name,
  setName,
  id,
  ownerId,
  setIsExiting,
  setIspassEditing,
  setIsAccountDeleting,
  isAccountDeleting,
  isExiting,
}) => {
  const { t } = useTranslation();

  const isUserBanned = useAppSelector(selectIsUserBanned);
  const areYouAdmin = useAppSelector(selectIsAdmin);

  // const [isIdShown, setIsIdShown] = useState(false);
  const [isEffectModalOpened, setIsEffectModalOpened] = useState(false);

  // const showIdHandler = () => {
  //   if (!isIdShown) {
  //     setIsIdShown(true);
  //   } else {
  //     navigator.clipboard.writeText(id);
  //     toast.success('Copied to Clipboard');
  //     setTimeout(() => {
  //       setIsIdShown(false);
  //     }, 5000);
  //   }
  // };

  const banUserHandler = () => {
    adminAPI.banUser(id, true);
  };
  return (
    <div className={styles.row} data-testid="profile-card-container">
      <Avatar isOwner={!id || id === ownerId} />
      {(!id || id === ownerId) && (
        <button
          className={styles.changeEffect}
          onClick={() => {
            setIsEffectModalOpened(true);
          }}
        >
          {t('changeAvatarEffect')}
        </button>
      )}

      {/* <div
        className={styles.idWrapper}
        onClick={showIdHandler}
        data-testid="id"
      >
        {isIdShown ? id : t('showMyId')}
      </div> */}
      <div className={styles.info} data-testid="info">
        <Name
          isNameEditing={isNameEditing}
          setIsNameEditing={setIsNameEditing}
          name={name}
          setName={setName}
          id={id}
          data-testid="name"
          isOwner={!id || id === ownerId}
        />

        {(!id || id === ownerId) && <ProfileData />}
        {areYouAdmin && (
          <>
            {isUserBanned ? (
              <Button
                text={t('revokeUser')}
                callback={banUserHandler}
                class="submit"
              ></Button>
            ) : (
              <Button
                text={t('banUser')}
                callback={banUserHandler}
                class="cancel"
              ></Button>
            )}
          </>
        )}
      </div>

      {(!id || id === ownerId) && (
        <Buttons
          setIsExiting={setIsExiting}
          setIspassEditing={setIspassEditing}
          setIsAccountDeleting={setIsAccountDeleting}
        />
      )}

      <Modal
        active={isAccountDeleting}
        setActive={setIsAccountDeleting}
        ChildComponent={DeleteProfile}
        childProps={{ toggleActive: setIsAccountDeleting }}
      />
      <Modal
        active={isExiting}
        setActive={setIsExiting}
        ChildComponent={Exit}
        childProps={{ toggleActive: setIsExiting }}
      />

      <Modal
        active={isEffectModalOpened}
        setActive={setIsEffectModalOpened}
        ChildComponent={ChangeAvatarEffect}
        childProps={{ toggleActive: setIsEffectModalOpened }}
      />
    </div>
  );
};

export default ProfileCard;
