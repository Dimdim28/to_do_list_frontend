import React, { SetStateAction, useEffect, useRef, useState } from "react";

import styles from "./Select.module.scss";

export type Item<T> = {
  name: string;
  value: T;
};

interface SelectProps<T> {
  items: Item<T>[];
  activeValue: string;
  callback: React.Dispatch<SetStateAction<T>>;
  width: string;
}

const Select = <T,>(
  props: React.PropsWithChildren<SelectProps<T>>
): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeName, setActiveName] = useState(props.activeValue);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div
      ref={selectRef}
      className={styles.wrapper}
      style={{ width: props.width }}
    >
      <div
        className={isOpen ? styles.activeTitle : styles.title}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeName}
      </div>
      {isOpen && (
        <ul className={styles.items}>
          {props.items.map((el, id) => (
            <li
              key={id}
              className={
                el.name === activeName ? styles.activeItem : styles.item
              }
              onClick={() => {
                setActiveName(el.name);
                props.callback(el.value);
                setIsOpen(false);
              }}
            >
              {el.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
