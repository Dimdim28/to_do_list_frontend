import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectErrorMessage,
  selectIsProjectInfo,
  selectProcessingColumnData,
} from '../../../../redux/slices/canban/selectors';
import {
  createCanBanColumn,
  updateCanBanColumn,
} from '../../../../redux/slices/canban/thunk';

import styles from './ChangeColumnName.module.scss';

interface ChangeColumnNameProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}
const ChangeColumnName: FC<ChangeColumnNameProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const editingData = useAppSelector(selectProcessingColumnData);
  const errorMessage = useAppSelector(selectErrorMessage);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  useEffect(() => {
    setTitle(editingData?.name || '');
  }, [editingData?.name]);

  const [title, setTitle] = useState(editingData?.name || '');

  const cancel = () => {
    toggleActive(false);
  };

  const submit = () => {
    if (!projectInfo?.id) return;

    if (editingData) {
      dispatch(
        updateCanBanColumn({
          columnId: editingData.id,
          title,
          boardId: projectInfo.id,
        }),
      );
    } else {
      dispatch(createCanBanColumn({ title, boardId: projectInfo.id }));
    }
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <Input title={t('title')} value={title} setValue={setTitle} type="text" />
      <div className={styles.actions}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button
          text={t('submit')}
          callback={submit}
          class="submit"
          disabled={title.length < 1}
        />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default ChangeColumnName;
