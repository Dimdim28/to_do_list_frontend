import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../components/common/Button/Button';
import { Modal } from '../../../components/common/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectIsAdmin } from '../../../redux/slices/auth/selectors';
import {
  selectIsUserBanned,
  selectUserProfile,
} from '../../../redux/slices/profile/selectors';
import { banUser } from '../../../redux/slices/profile/thunk';

import Avatar from './Avatar/Avatar';
import DeleteProfile from './DeleteProfile/DeleteProfile';
import Exit from './Exit/Exit';
import Name from './Name/Name';
import ProfileData from './ProfileData/ProfileData';

import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  isNameEditing: boolean;
  setIsNameEditing: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  id: string;
  ownerId: string;
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsAccountDeleting,
  isAccountDeleting,
  isExiting,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isUserBanned = useAppSelector(selectIsUserBanned);
  const areYouAdmin = useAppSelector(selectIsAdmin);
  const profileData = useAppSelector(selectUserProfile);

  const [avatarEffectStatus, setAvatarEffectStatus] = useState<
    'intro' | 'loop' | 'no'
  >('intro');

  const effectsImages = {
    intro: profileData?.profileEffect.intro,
    loop: profileData?.profileEffect.sides,
  };

  const banUserHandler = (id: string, isBanned: boolean) => {
    dispatch(banUser({ id, isBanned }));
  };

  useEffect(() => {
    if (avatarEffectStatus === 'intro') {
      setTimeout(() => {
        setAvatarEffectStatus('loop');
      }, 3000);
    }
  }, [avatarEffectStatus]);

  return (
    <div className={styles.row} data-testid="profile-card-container">
      {avatarEffectStatus !== 'no' ? (
        <img
          className={styles.backgroundEffect}
          src={effectsImages[avatarEffectStatus]}
        />
      ) : null}

      <Avatar isOwner={!id || id === ownerId} />

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

        {!!id && areYouAdmin && id !== ownerId && (
          <>
            {isUserBanned ? (
              <Button
                text={t('revokeUser')}
                callback={() => banUserHandler(id, false)}
                class="submit"
              ></Button>
            ) : (
              <Button
                text={t('banUser')}
                callback={() => banUserHandler(id, true)}
                class="cancel"
              ></Button>
            )}
          </>
        )}
      </div>

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
    </div>
  );
};

export default ProfileCard;
