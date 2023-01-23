import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.preloader}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Preloader;
