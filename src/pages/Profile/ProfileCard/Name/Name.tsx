import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../hooks';
import { clearProfileErrorMessage } from '../../../../redux/slices/profile/profile';
import { changeName } from '../../../../redux/slices/profile/thunk';

import styles from './Name.module.scss';

import { faCheck, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NameProps {
  isNameEditing: boolean;
  setIsNameEditing: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  isOwner: boolean;
}

const Name: FC<NameProps> = ({
  isNameEditing,
  setIsNameEditing,
  name,
  setName,
  isOwner,
  id,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [displayedName, setDisplayedName] = useState(name);

  const sumbitChangeName = async () => {
    await dispatch(changeName({ userId: id, username: displayedName }));
    setIsNameEditing(false);
  };

  const cancelChangeName = async () => {
    setIsNameEditing(false);
    setName(name);
    setDisplayedName(name);
  };

  return (
    <div className={styles.line} data-testid="name-container">
      <p className={styles.name} data-testid="name-component">
        {t('name')}:
      </p>
      {isNameEditing && isOwner ? (
        <>
          <input
            className={styles.inputName}
            value={displayedName}
            onChange={(e) => setDisplayedName(e.currentTarget.value)}
            data-testid="input-name-component"
          />
          <FontAwesomeIcon
            onClick={sumbitChangeName}
            className={styles.check}
            icon={faCheck}
            data-testid="check-component"
          />
          <FontAwesomeIcon
            onClick={cancelChangeName}
            className={styles.close}
            icon={faX}
            data-testid="close-component"
          />
        </>
      ) : (
        <>
          <p className={styles.text} data-testid="text-component">
            {name}
          </p>
          {isOwner && (
            <div
              onClick={() => {
                dispatch(clearProfileErrorMessage());
                setIsNameEditing(true);
              }}
              data-testid="edit-component"
            >
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.pencil}`}
                onClick={() => {}}
                color="rgb(163, 163, 163)"
                fontSize="15px"
                icon={faPencil}
                data-testid="pencil-component"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Name;
