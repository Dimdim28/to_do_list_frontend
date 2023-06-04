import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div
      data-testid="preloader-container"
      className={styles.preloaderContainer}
    >
      <div data-testid="preloader" className={styles.preloader}>
        <div data-testid="loader" className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Preloader;
