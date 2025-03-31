import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { editTagInColumns } from '../../../../redux/slices/canban/canban';
import { selectIsProjectInfo } from '../../../../redux/slices/canban/selectors';
import { Tag } from '../../../../redux/slices/canban/type';
import { Status } from '../../../../types/shared';

import styles from './EditTagProjectModal.module.scss';

interface EditTagProjectModalProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { tag: Tag; updateTag: (tag: Tag) => void };
}

const EditTagProjectModal: FC<EditTagProjectModalProps> = ({
  toggleActive,
  childProps,
}) => {
  const currentTag = childProps.tag;
  const updateTag = childProps.updateTag;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const projectInfo = useAppSelector(selectIsProjectInfo);

  const [color, setColor] = useState(currentTag?.color || '#ffffff');
  const [text, setText] = useState(currentTag?.title || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!projectInfo?.id || !currentTag._id) return;
    setIsLoading(true);

    const result = await canbanAPI.updateTag({
      boardId: projectInfo.id,
      tagId: currentTag._id,
      color: color,
      title: text,
    });
    if (result.status === Status.SUCCESS) {
      updateTag({ _id: currentTag._id, title: text, color });
      dispatch(editTagInColumns(currentTag));
      setError('');
      setIsLoading(false);
      toggleActive(false);
    } else {
      setError(result.message);
      setIsLoading(false);
    }

    toggleActive(false);
  };

  const cancel = () => {
    toggleActive(false);
  };

  useEffect(() => {
    const tag = currentTag;
    if (tag) {
      setColor(tag.color);
      setText(tag.title);
    }
  }, [currentTag?._id]);

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{t('tagColor')}</h3>
      <input
        data-testid="color-input"
        className={styles.chooseColor}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Input title={'title'} value={text} setValue={setText} type="text" />
      <div className={styles.buttons}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button
          text={t('submit')}
          callback={submit}
          class="submit"
          disabled={text.length < 3}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditTagProjectModal;
