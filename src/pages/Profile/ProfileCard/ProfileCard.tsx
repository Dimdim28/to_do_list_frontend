import React, { useState, FC } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Avatar from './Avatar/Avatar';
import Name from './Name/Name';
import ProfileData from './ProfileData/ProfileData';
import Buttons from './Buttons/Buttons';
import DeleteProfile from './DeleteProfile/DeleteProfile';
import Exit from './Exit/Exit';
import { Modal } from '../../../components/common/Modal/Modal';

import styles from './ProfileCard.module.scss';
import { ChangeAvatarEffect } from '../ChangeEvatarEffect/ChangeAvatarEffect';

interface ProfileCardProps {
  isNameEditing: boolean;
  setIsNameEditing: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  id: string;
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

  setIsExiting,
  setIspassEditing,
  setIsAccountDeleting,

  isAccountDeleting,
  isExiting,
}) => {
  const { t } = useTranslation();

  const [isIdShown, setIsIdShown] = useState(false);
  const [isEffectModalOpened, setIsEffectModalOpened] = useState(false);

  const showIdHandler = () => {
    if (!isIdShown) {
      setIsIdShown(true);
    } else {
      navigator.clipboard.writeText(id);
      toast.success('Copied to Clipboard');
      setTimeout(() => {
        setIsIdShown(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.row} data-testid="profile-card-container">
      <Avatar />
      <button
        className={styles.changeEffect}
        onClick={() => {
          setIsEffectModalOpened(true);
        }}
      >
        Change effect
      </button>

      <div
        className={styles.idWrapper}
        onClick={showIdHandler}
        data-testid="id"
      >
        {isIdShown ? id : t('showMyId')}
      </div>
      <div className={styles.info} data-testid="info">
        <Name
          isNameEditing={isNameEditing}
          setIsNameEditing={setIsNameEditing}
          name={name}
          setName={setName}
          id={id}
          data-testid="name"
        />

        <ProfileData />
      </div>

      <Buttons
        setIsExiting={setIsExiting}
        setIspassEditing={setIspassEditing}
        setIsAccountDeleting={setIsAccountDeleting}
      />

      {isAccountDeleting && (
        <Modal
          active={isAccountDeleting}
          setActive={setIsAccountDeleting}
          ChildComponent={DeleteProfile}
          childProps={{ toggleActive: setIsAccountDeleting }}
        />
      )}
      {isExiting && (
        <Modal
          active={isExiting}
          setActive={setIsExiting}
          ChildComponent={Exit}
          childProps={{ toggleActive: setIsExiting }}
        />
      )}
      {
        <Modal
          active={isEffectModalOpened}
          setActive={setIsEffectModalOpened}
          ChildComponent={ChangeAvatarEffect}
          childProps={{ toggleActive: setIsEffectModalOpened }}
        />
      }
    </div>
  );
};

export default ProfileCard;
