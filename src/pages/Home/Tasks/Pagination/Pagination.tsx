import { useAppDispatch } from '../../../../hooks';
import { updateTaskCurrentPage } from '../../../../redux/slices/home/home';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

interface PageButtonProps {
  label: string;
  num: number;
  disabled: boolean;
  active?: boolean;
  callBack: (value: number) => void;
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

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const dispatch = useAppDispatch();
  const setCurrentPage = (value: number) =>
    dispatch(updateTaskCurrentPage(value));

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
