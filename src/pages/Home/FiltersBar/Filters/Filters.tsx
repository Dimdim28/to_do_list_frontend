import React from "react";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import Select from "../../../../components/common/Select/Select";
import styles from "./Filters.module.scss";

export type Date = "day" | "week" | "month" | "all";
export type IsCompleted = "true" | "false" | "all";

export interface FiltersState {
  hasDeadline: boolean;
  date: Date;
  isCompleted: IsCompleted;
}

interface FiltersProps {
  data: FiltersState;
  setData: React.Dispatch<FiltersState>;
}
const Filters: React.FC<FiltersProps> = (props) => {
  const selectStatusOptions = [
    { name: "Completed", value: "true" },
    { name: "In process", value: "false" },
    { name: "all", value: "all" },
  ];

  const selectDateOptions = [
    { name: "day", value: "day" },
    { name: "week", value: "week" },
    { name: "month", value: "month" },
    { name: "all", value: "all" },
  ];

  return (
    <section className={styles.dateWrapper}>
      <h2>Date and status</h2>
      <Select
        items={selectStatusOptions}
        width="200px"
        activeValue={props.data.isCompleted}
        callback={(newValue: any) =>
          props.setData({ ...props.data, isCompleted: newValue })
        }
      />
      <Checkbox
        isChecked={props.data.hasDeadline}
        setIsChecked={(newValue: any) =>
          props.setData({ ...props.data, hasDeadline: newValue })
        }
        label="With deadline"
      />
      {props.data.hasDeadline && (
        <Select
          items={selectDateOptions}
          activeValue={props.data.date}
          width="200px"
          callback={(newValue: any) =>
            props.setData({ ...props.data, date: newValue })
          }
        />
      )}
      date: {props.data.date}
      <br />
      isCompleted: {props.data.isCompleted}
    </section>
  );
};

export default Filters;
