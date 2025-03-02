import { Dispatch, FC, SetStateAction, useState } from 'react';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addTagToList,
  updateTagInList,
} from '../../../../redux/slices/canban/canban';
import { selectSelectedTag } from '../../../../redux/slices/canban/selectors';

import styles from './AddTagToProjectModal.module.scss';

interface AddTagToProgectModalProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const AddTagToProgectModal: FC<AddTagToProgectModalProps> = ({
  toggleActive,
}) => {
  const dispatch = useAppDispatch();

  const currentTag = useAppSelector(selectSelectedTag);

  const [color, setColor] = useState(currentTag.tag?.color || '#ffffff');
  const [text, setText] = useState(currentTag.tag?.text || '');

  const submit = async () => {
    toggleActive(false);
    if (currentTag.tag) {
      dispatch(updateTagInList({ id: currentTag.tag.id, text, color }));
    } else {
      dispatch(addTagToList({ id: `${Math.random() * 1000}`, text, color }));
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

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

export default AddTagToProgectModal;
