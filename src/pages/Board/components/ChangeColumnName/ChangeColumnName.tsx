import { Dispatch, FC, SetStateAction, useState } from 'react';
import { t } from 'i18next';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addColumn, editColumn } from '../../../../redux/slices/canban/canban';
import {
  selectEditingColumnData,
  selectErrorMessage,
} from '../../../../redux/slices/canban/selectors';

import styles from './ChangeColumnName.module.scss';

interface ChangeColumnNameProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}
const ChangeColumnName: FC<ChangeColumnNameProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();

  const editingData = useAppSelector(selectEditingColumnData);
  const errorMessage = useAppSelector(selectErrorMessage);

  const [title, setTitle] = useState(editingData?.name || '');

  const cancel = () => {
    toggleActive(false);
  };

  const submit = () => {
    if (editingData) {
      dispatch(editColumn({ columnId: editingData.id, title }));
    } else {
      dispatch(addColumn(title));
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
          disabled={title.length < 3}
        />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default ChangeColumnName;
