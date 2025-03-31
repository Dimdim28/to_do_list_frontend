import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteTagFromColumns } from '../../../../redux/slices/canban/canban';
import { selectIsProjectInfo } from '../../../../redux/slices/canban/selectors';
import { Tag } from '../../../../redux/slices/canban/type';
import { Status } from '../../../../types/shared';

import styles from './DeleteTag.module.scss';

interface DeleteTagProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    tag: Tag;
    deleteTag: (tag: Tag) => void;
  };
}
const DeleteTag: FC<DeleteTagProps> = ({ toggleActive, childProps }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { tag, deleteTag } = childProps;
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const title = tag?.title || '';
  const cancel = () => {
    toggleActive(false);
  };

  const submit = async () => {
    if (!projectInfo?.id || !tag?._id) return;
    setIsLoading(true);

    const result = await canbanAPI.deleteTag({
      boardId: projectInfo.id,
      tagId: tag._id,
    });
    if (result.status === Status.SUCCESS) {
      deleteTag(tag);
      setIsLoading(false);
      setError('');
      toggleActive(false);
      dispatch(deleteTagFromColumns(tag._id));
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t('sureDeleteTag')}</p>
        <h3 style={{ color: tag?.color }}>{truncate(title, 12)}?</h3>
      </div>

      <div className={styles.actions}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button text={t('submit')} callback={submit} class="submit" />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DeleteTag;
