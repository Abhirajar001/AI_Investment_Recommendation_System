import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { createStorageMock } from './utils/storageMock';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: createStorageMock(),
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  cleanup();
});