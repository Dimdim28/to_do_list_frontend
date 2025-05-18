import withLoginRedirect from '../../hoc/withLoginRedirect';

import MyDecks from './components/MyDecks/MyDecks';

import styles from './Roadmaps.module.scss';

const Roadmaps = () => {
  return (
    <div className={styles.wrapper}>
      <MyDecks />
    </div>
  );
};

export default withLoginRedirect(Roadmaps);
