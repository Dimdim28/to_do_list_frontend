import React, { useCallback, useEffect } from "react";

import { Category } from "../../../api/categoryAPI";

import styles from "./Modal.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  ChildComponent: any;
  childProps: Category | {};
}

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

export const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  ChildComponent,
  childProps,
}) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        setActive(false);
      }
    },
    [setActive]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey]);

  return (
    <div
      role="dialog-wrapper"
      className={active ? styles.modalActive : styles.modal}
    >
      {active && (
        <div
          role="dialog"
          data-testid="modal-content"
          className={active ? styles.modalContentActive : styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            data-testid="modal-close-button"
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
