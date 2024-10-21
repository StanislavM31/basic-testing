// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  jest.useFakeTimers();

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  jest.useFakeTimers();

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockJoin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (path.join as jest.Mock).mockImplementation(mockJoin);
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test/file.txt';

    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(
      expect.stringContaining('basic-testing'),
      pathToFile,
    );
  });

  test('should return null if file does not exist', async () => {
    jest.mock('fs/promises', () => ({
      readFile: jest.fn().mockRejectedValue(new Error('File not found')),
    }));

    const result = await readFileAsynchronously('non-existent-file.txt');

    expect(result).toBeNull();
  });
  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
