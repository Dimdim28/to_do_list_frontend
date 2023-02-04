import styles from "./Modal.module.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Category } from "../../../api/sendCategory";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  ChildComponent: any;
  childProps: Category | {};
}

export const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  ChildComponent,
  childProps,
}) => {
  return (
    <div
      className={active ? styles.modalActive : styles.modal}
      onClick={() => setActive(false)}
    >
      {active && (
        <div
          className={active ? styles.modalContentActive : styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles.close}
            onClick={() => setActive(false)}
          />
          <ChildComponent toggleActive={setActive} childProps={childProps} />
        </div>
      )}
    </div>
  );
};
