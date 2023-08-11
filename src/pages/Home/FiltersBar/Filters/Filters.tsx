import { SetStateAction, Dispatch, FC } from "react";

import Select, { Item } from "../../../../components/common/Select/Select";

import styles from "./Filters.module.scss";

export type Date =
  | "day"
  | "week"
  | "month"
  | "year"
  | "all"
  | "outdated"
  | "nodeadline";
export type IsCompleted = "true" | "false" | "all";

interface FiltersProps {
  date: Date;
  isCompleted: IsCompleted;
  setDate: Dispatch<SetStateAction<Date>>;
  setIsCompleted: Dispatch<SetStateAction<IsCompleted>>;
}
const Filters: FC<FiltersProps> = ({
  isCompleted,
  setIsCompleted,
  date,
  setDate,
}) => {
  const SELECT_STATUS_OPTIONS: Item<IsCompleted>[] = [
    { name: "Completed", value: "true" },
    { name: "In process", value: "false" },
    { name: "all", value: "all" },
  ];

  const SELECT_DATE_OPTIONS: Item<Date>[] = [
    { name: "day", value: "day" },
    { name: "week", value: "week" },
    { name: "month", value: "month" },
    { name: "year", value: "year" },
    { name: "all", value: "all" },
    { name: "outdated", value: "outdated" },
    { name: "no deadline", value: "nodeadline" },
  ];

  return (
    <section className={styles.dateWrapper}>
      <h3>Date and status</h3>

      <h5>Deadline filters</h5>

      <div className={styles.deadline}>
        <Select<Date>
          items={SELECT_DATE_OPTIONS}
          activeValue={date}
          width="200px"
          callback={setDate}
          clearCompletingStatus={setIsCompleted}
        />
      </div>

      {date !== "outdated" && (
        <>
          <h5>Completion status</h5>
          <div className={styles.progressStatus}>
            <Select<IsCompleted>
              items={SELECT_STATUS_OPTIONS}
              width="200px"
              activeValue={isCompleted}
              callback={setIsCompleted}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Filters;
