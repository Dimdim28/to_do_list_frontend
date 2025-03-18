import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import { Tag } from '../../../../redux/slices/canban/type';

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

  const [color, setColor] = useState(currentTag?.color || '#ffffff');
  const [text, setText] = useState(currentTag?.text || '');

  const submit = async () => {
    toggleActive(false);
    if (currentTag) {
      updateTag({ id: currentTag.id, text, color });
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  useEffect(() => {
    const tag = currentTag;
    if (tag) {
      setColor(tag.color);
      setText(tag.text);
    }
  }, [currentTag?.id]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{'Color'}</h3>
      <input
        data-testid="color-input"
        className={styles.chooseColor}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Input title={'title'} value={text} setValue={setText} type="text" />

      <div className={styles.buttons}>
        <Button text={'Cancel'} callback={cancel} class="cancel" />
        <Button
          text={'Submit'}
          callback={submit}
          class="submit"
          disabled={text.length < 3}
        />
      </div>
    </div>
  );
};

export default EditTagProjectModal;
