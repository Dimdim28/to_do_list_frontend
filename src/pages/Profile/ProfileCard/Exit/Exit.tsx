import { Dispatch, FC,SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import socketsAPI from '../../../../api/socketsAPI';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { logout } from '../../../../redux/slices/auth/auth';
import { clear } from '../../../../redux/slices/home/home';
import { exit } from '../../../../redux/slices/profile/profile';
import {
  selectProfileMessage,
  selectProfileStatus,
} from '../../../../redux/slices/profile/selectors';
import { Status } from '../../../../types/shared';

import styles from './Exit.module.scss';

interface ExitFromAccountProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const Exit: FC<ExitFromAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileMessage);

  const submit = async () => {
    dispatch(logout());
    dispatch(exit());
    dispatch(clear());
    toggleActive(false);
    socketsAPI.closeConnection();
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper} data-testid="exit-container">
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title} data-testid="are-you-sure-container">
            {t('areYouSure')}
          </h3>
          <div className={styles.buttons}>
            <Button
              text={t('no')}
              callback={cancel}
              class="cancel"
              data-testid="cancel-container"
            />
            <Button
              text={t('yes')}
              callback={submit}
              class="submit"
              data-testid="submit-container"
            />
          </div>

          {status === Status.ERROR && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default Exit;
