import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import instanse from '../../axios';
import Button from '../../components/common/Button/Button';

import styles from './EmailConfirmationRequired.module.scss';

const EmailConfirmationRequired: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const email = localStorage.getItem('emailForVerification');
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await instanse.post('/auth/resend-email-verification', {
        email,
      });
      toast.success(t('resendSuccess'));
    } catch (err: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('emailConfirmTitle')}</h1>
      <p className={styles.text}>{t('emailConfirmText')}</p>
      {email ? (
        <Button
          text={t('resendEmail')}
          class="submit"
          callback={handleResend}
          disabled={loading}
        />
      ) : null}
    </div>
  );
};

export default EmailConfirmationRequired;
