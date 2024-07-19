import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import Select, { Item } from '../../../../components/common/Select/Select';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  updateTaskDate,
  updateTaskIsCompleted,
} from '../../../../redux/slices/home/home';
import {
  selectTasksDate,
  selectTasksIsCompleted,
} from '../../../../redux/slices/home/selectors';

import styles from './Filters.module.scss';

export type Date =
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'all'
  | 'outdated'
  | 'nodeadline';
export type IsCompleted = 'true' | 'false' | 'all';

const Filters: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const date = useAppSelector(selectTasksDate);
  const isCompleted = useAppSelector(selectTasksIsCompleted);

  const SELECT_STATUS_OPTIONS: Item<IsCompleted>[] = [
    { name: i18next.t('statusCompleted'), value: 'true' },
    { name: i18next.t('statusInProcess'), value: 'false' },
    { name: i18next.t('statusAll'), value: 'all' },
  ];

  const SELECT_DATE_OPTIONS: Item<Date>[] = [
    { name: i18next.t('deadlineDay'), value: 'day' },
    { name: i18next.t('deadlineWeek'), value: 'week' },
    { name: i18next.t('deadlineMonth'), value: 'month' },
    { name: i18next.t('deadlineYear'), value: 'year' },
    { name: i18next.t('deadlineAll'), value: 'all' },
    { name: i18next.t('deadlineOutdated'), value: 'outdated' },
    { name: i18next.t('deadlineNoDeadline'), value: 'nodeadline' },
  ];

  const setDate = (date: Date) => {
    dispatch(updateTaskDate(date));
  };

  const setIsCompleted = (isCompleted: IsCompleted) => {
    dispatch(updateTaskIsCompleted(isCompleted));
  };

  return (
    <section className={styles.dateWrapper}>
      <h3>{t('dateAndStatus')}</h3>

      <h5>{t('deadlineFilters')}</h5>

      <div className={styles.deadline}>
        <Select<Date>
          items={SELECT_DATE_OPTIONS}
          activeValue={date}
          width="200px"
          callback={setDate}
        />
      </div>

      {date !== 'outdated' && (
        <>
          <h5>{t('completionStatus')}</h5>
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
