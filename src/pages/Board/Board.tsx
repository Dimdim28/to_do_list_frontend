import styles from './Board.module.scss';
import MyDecks from './components/MyDecks/MyDecks';

const Board = () => {
  return (
    <div className={styles.wrapper}>
      <MyDecks />
    </div>
  );
};

export default Board;
