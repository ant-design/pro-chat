import dayjs from 'dayjs';
import MockDate from 'mockdate';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  // @ts-ignore
  MockDate.set(dayjs(dateString).toString());
}

export function resetMockDate() {
  MockDate.reset();
}

export * from '@testing-library/react';
