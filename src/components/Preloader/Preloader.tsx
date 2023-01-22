import styles from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
