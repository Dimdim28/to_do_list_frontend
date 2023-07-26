import React from "react";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface PageButtonProps {
  label: string;
  num: number;
  disabled: boolean;
  active?: boolean;
  callBack: React.Dispatch<React.SetStateAction<number>>;
}

const PageButton = ({
  label,
  callBack,
  num,
  disabled,
  active,
}: PageButtonProps) => {
  return (
    <div
      className={
        active
          ? styles.activePageButton
          : disabled
          ? styles.disabledPageButton
          : styles.pageButton
      }
      onClick={() => {
        if (!disabled) callBack(num);
      }}
    >
      {label}
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className={styles.wrapper}>
      <PageButton
        callBack={setCurrentPage}
        num={1}
        label="<<"
        disabled={currentPage === 1}
      />
      <PageButton
        callBack={setCurrentPage}
        num={currentPage - 1}
        label="<"
        disabled={currentPage < 2}
      />
      <PageButton
        callBack={setCurrentPage}
        num={currentPage}
        label={String(currentPage)}
        active
        disabled
      />
      <PageButton
        callBack={setCurrentPage}
        num={currentPage + 1}
        label=">"
        disabled={currentPage > totalPages - 1}
      />
      <PageButton
        callBack={setCurrentPage}
        num={totalPages}
        label=">>"
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
