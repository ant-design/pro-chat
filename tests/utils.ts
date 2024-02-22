import { render, RenderOptions } from '@testing-library/react';
import dayjs from 'dayjs';
import MockDate from 'mockdate';
import type { ReactElement } from 'react';
import { StrictMode } from 'react';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  // @ts-ignore
  MockDate.set(dayjs(dateString).toString());
}

export function resetMockDate() {
  MockDate.reset();
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });

export * from '@testing-library/react';
export { customRender as render };
