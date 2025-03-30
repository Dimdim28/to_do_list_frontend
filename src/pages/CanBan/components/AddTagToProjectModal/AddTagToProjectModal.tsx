import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addTagToList,
  updateTagInList,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectSelectedTag,
} from '../../../../redux/slices/canban/selectors';
import { Status } from '../../../../types/shared';

import styles from './AddTagToProjectModal.module.scss';

interface AddTagToProgectModalProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const AddTagToProgectModal: FC<AddTagToProgectModalProps> = ({
  toggleActive,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentTag = useAppSelector(selectSelectedTag);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const [color, setColor] = useState(currentTag.tag?.color || '#ffffff');
  const [text, setText] = useState(currentTag.tag?.title || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!projectInfo?.id) return;
    setIsLoading(true);
    if (currentTag.tag) {
      dispatch(
        updateTagInList({ _id: currentTag.tag._id, title: text, color }),
      );
    } else {
      const result = await canbanAPI.createTag({
        boardId: projectInfo.id,
        color,
        title: text,
      });
      if (result.status === Status.SUCCESS) {
        dispatch(addTagToList(result.data));
        setError('');
        setColor('#ffffff');
        setText('');
        setIsLoading(false);
        toggleActive(false);
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  useEffect(() => {
    const tag = currentTag?.tag;
    if (tag) {
      setColor(tag.color);
      setText(tag.title);
    }
  }, [currentTag?.tag?._id]);

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
      <Input title={t('title')} value={text} setValue={setText} type="text" />

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

export default AddTagToProgectModal;
