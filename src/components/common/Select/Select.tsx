import React, { SetStateAction, useEffect, useRef, useState } from "react";

import styles from "./Select.module.scss";
import { IsCompleted } from "../../../pages/Home/FiltersBar/Filters/Filters";

export type Item<T> = {
  name: string;
  value: T;
};

interface SelectProps<T> extends React.ComponentPropsWithoutRef<"input"> {
  items: Item<T>[];
  activeValue: string;
  callback: React.Dispatch<SetStateAction<T>>;
  width: string;
  clearCompletingStatus?: React.Dispatch<React.SetStateAction<IsCompleted>>;
}

const Select = <T,>({
  items,
  activeValue,
  callback,
  width,
  clearCompletingStatus,
}: React.PropsWithChildren<SelectProps<T>>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeName, setActiveName] = useState(
    items.find((el) => el.value === activeValue)?.name
  );
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
    <div ref={selectRef} className={styles.wrapper} style={{ width: width }}>
      <div
        data-testid="select-button"
        className={isOpen ? styles.activeTitle : styles.title}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeName}
      </div>
      {isOpen && (
        <ul className={styles.items}>
          {items.map((el, id) => (
            <li
              data-testid={`option-${1 + id}`}
              key={id}
              className={
                el.name === activeName ? styles.activeItem : styles.item
              }
              onClick={() => {
                setActiveName(el.name);
                callback(el.value);
                setIsOpen(false);
                if (clearCompletingStatus) clearCompletingStatus("all");
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
