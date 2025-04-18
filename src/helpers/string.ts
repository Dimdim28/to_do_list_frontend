export const humaniseDate = (date: string) => {
  const DateInstance = new Date(date);
  let day: string | number = DateInstance.getDate();
  let month: string | number = DateInstance.getMonth() + 1;
  const year = DateInstance.getFullYear();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  return [day, month, year].join('.');
};

export const truncate = (str: string | undefined, maxlength: number) => {
  if (!str) return '';
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
};

export function getRelativeTime(
  dateString: string,
  t: (key: string, options?: any) => string,
): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSec < 60) return t('updated.justNow');
  if (diffMin < 5) return t('updated.fewMinutesAgo');
  if (diffMin < 60) return t('updated.minutesAgo', { count: diffMin });
  if (diffHours < 2) return t('updated.anHourAgo');
  if (diffHours < 5) return t('updated.hoursAgo', { count: diffHours });
  if (diffDays < 1) return t('updated.today');
  if (diffDays === 1) return t('updated.yesterday');
  if (diffDays < 7) return t('updated.daysAgo', { count: diffDays });
  if (diffWeeks === 1) return t('updated.aWeekAgo');
  if (diffWeeks < 4) return t('updated.weeksAgo', { count: diffWeeks });

  return date.toLocaleDateString();
}
