import { Dispatch, FC, SetStateAction } from 'react';

import Button from '../../../../components/common/Button/Button';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteColumn } from '../../../../redux/slices/canban/canban';
import {
  selectErrorMessage,
  selectProcessingColumnData,
} from '../../../../redux/slices/canban/selectors';

import styles from './DeleteColumn.module.scss';

interface DeleteColumnProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}
const DeleteColumn: FC<DeleteColumnProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();

  const editingData = useAppSelector(selectProcessingColumnData);
  const errorMessage = useAppSelector(selectErrorMessage);

  const title = editingData?.name || '';

  const cancel = () => {
    toggleActive(false);
  };

  const submit = () => {
    if (editingData) {
      dispatch(deleteColumn(editingData.id));
    }
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>Are you sure you want to delete column</p>
        <h3>{truncate(title, 12)}</h3>
      </div>

      <div className={styles.actions}>
        <Button text={'Cancel'} callback={cancel} class="cancel" />
        <Button
          text={'Submit'}
          callback={submit}
          class="submit"
          disabled={title.length < 3}
        />
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default DeleteColumn;
