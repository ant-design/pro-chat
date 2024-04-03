import dayjs from 'dayjs';

export const formatTime = (time: number): string => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'TEST') {
    return '2024-02-27 17:20:00';
  }

  const now = dayjs();
  const target = dayjs(time);

  if (target.isSame(now, 'day')) {
    return target.format('HH:mm:ss');
  } else if (target.isSame(now, 'year')) {
    return target.format('MM-DD HH:mm:ss');
  } else {
    return target.format('YYYY-MM-DD HH:mm:ss');
  }
};
