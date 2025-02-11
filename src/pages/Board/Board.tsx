import MyDecks from '../CanBan/components/MyDecks/MyDecks';

import styles from './Board.module.scss';

const Board = () => {
  return (
    <div className={styles.wrapper}>
      <MyDecks />
    </div>
  );
};

export default Board;
