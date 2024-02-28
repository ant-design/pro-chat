import '@testing-library/jest-dom/vitest';
import { theme } from 'antd';
// Not use dynamic hashed for test env since version will change hash dynamically.
theme.defaultConfig.hashed = false;

process.env.TZ = 'UTC';

if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    // @ts-ignore-next-line
    global.window.innerWidth = width || global.window.innerWidth;
    // @ts-ignore-next-line
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };

  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      value: vi.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: () => {},
        addEventListener: () => {},
        removeListener: () => {},
        removeEventListener: () => {},
      })),
    });
  }

  window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }));

  global.window.HTMLElement.prototype.scrollIntoView = () => {};
}
