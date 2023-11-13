import { useRef, FC, FormEvent } from 'react';
import { toast } from 'react-toastify';

import withLoginRedirect from '../../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectUserProfile,
} from '../../../redux/slices/profile/selectors';
import {
  changeAvatar,
} from '../../../redux/slices/profile/thunk';

import styles from './Avatar.module.scss';

import {
  faCheck,
  faCirclePlus,
  faPencil,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Avatar: FC = () => {
    const dispatch = useAppDispatch();

    const inputFileRef = useRef<HTMLInputElement>(null);

    const profile = useAppSelector(selectUserProfile) || {
        avatar: null,
      };
    const { avatar } = profile;

    const handleChangeFile = async (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
    
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          return toast.error('File type should be image, png, jpg or jpeg');
        }
    
        const formData = new FormData();
        formData.append('image', file);
    
        try {
          await dispatch(changeAvatar({ image: formData }));
        } catch (e) {
          toast.error(`${e}`);
        }
      };
    
    return (
        <div className={styles.avatar}>
            <input type="file" ref={inputFileRef} onChange={handleChangeFile} />
            {avatar && <img src={avatar.url} alt="logo" />}
            <div
              className={styles.addPhoto}
              onClick={() => inputFileRef.current?.click()}
            >
              <FontAwesomeIcon className={styles.camera} icon={faCirclePlus} />
            </div>
          </div>
    );
};

export default withLoginRedirect(Avatar);