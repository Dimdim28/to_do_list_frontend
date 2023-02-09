import React, { SetStateAction } from "react";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import Select, { Item } from "../../../../components/common/Select/Select";
import styles from "./Filters.module.scss";

export type Date = "day" | "week" | "month" | "all";
export type IsCompleted = "true" | "false" | "all";

interface FiltersProps {
  date: Date;
  isCompleted: IsCompleted;
  hasDeadline: boolean;
  setDate: React.Dispatch<SetStateAction<Date>>;
  setHasDeadline: React.Dispatch<SetStateAction<boolean>>;
  setIsCompleted: React.Dispatch<SetStateAction<IsCompleted>>;
}
const Filters: React.FC<FiltersProps> = (props) => {
  const selectStatusOptions: Item<IsCompleted>[] = [
    { name: "Completed", value: "true" },
    { name: "In process", value: "false" },
    { name: "all", value: "all" },
  ];

  const selectDateOptions: Item<Date>[] = [
    { name: "day", value: "day" },
    { name: "week", value: "week" },
    { name: "month", value: "month" },
    { name: "all", value: "all" },
  ];

  return (
    <section className={styles.dateWrapper}>
      <h2>Date and status</h2>
      <Select<IsCompleted>
        items={selectStatusOptions}
        width="200px"
        activeValue={props.isCompleted}
        callback={props.setIsCompleted}
      />
      <Checkbox
        isChecked={props.hasDeadline}
        setIsChecked={props.setHasDeadline}
        label="With deadline"
      />
      {props.hasDeadline && (
        <Select<Date>
          items={selectDateOptions}
          activeValue={props.date}
          width="200px"
          callback={props.setDate}
        />
      )}
      date: {props.date}
      <br />
      isCompleted: {props.isCompleted}
    </section>
  );
};

export default Filters;
