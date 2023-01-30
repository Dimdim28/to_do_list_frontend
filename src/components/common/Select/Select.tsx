import React, { SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";

type Item = {
  name: string;
  value: string;
};
interface SelectProps {
  items: Item[];
  activeValue: string;
  callback: React.Dispatch<SetStateAction<string>>;
  width: string;
}

const Select = (props: SelectProps) => {
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
