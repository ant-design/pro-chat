import { cleanup, render } from '@testing-library/react';
import { glob } from 'glob';
import path from 'path';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { resetMockDate } from './utils';

function demoTest(component: string) {
  beforeEach(() => {
    process.env.NODE_ENV = 'TEST';
    // setMockDate('2020-07-15T05:20:00.795');
    // mock time 2024-02-27 17:20:02
    vi.useFakeTimers({ now: 1709025603 });
  });

  afterEach(() => {
    vi.useRealTimers();
    resetMockDate();
  });

  describe(`<${component} />`, () => {
    const files = glob.sync(path.resolve(__dirname, `../src/${component}/demos/*.tsx`));

    files.forEach((file) => {
      const demoName = file.split('/').pop();

      it(`renders ${demoName} correctly`, async () => {
        const Demo = await import(file);

        if (!demoName) return;
        // 快照一致
        const wrapper = render(<Demo.default />);
        expect(wrapper.asFragment()).toMatchSnapshot();
        cleanup();
      });
    });
  });
}

export default demoTest;
