import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectErrorMessage,
  selectIsProjectInfo,
  selectProcessingColumnData,
} from '../../../../redux/slices/canban/selectors';
import { deleteCanBanColumn } from '../../../../redux/slices/canban/thunk';

import styles from './DeleteColumn.module.scss';

interface DeleteColumnProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}
const DeleteColumn: FC<DeleteColumnProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const editingData = useAppSelector(selectProcessingColumnData);
  const errorMessage = useAppSelector(selectErrorMessage);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const title = editingData?.name || '';

  const cancel = () => {
    toggleActive(false);
  };

  const submit = () => {
    if (!projectInfo?.id) return;

    if (editingData) {
      dispatch(
        deleteCanBanColumn({
          columnId: editingData.id,
          boardId: projectInfo.id,
        }),
      );
    }
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t('sureDeleteColumn')}</p>
        <h3>{truncate(title, 12)}?</h3>
      </div>

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

export default DeleteColumn;
