import useDebounce from '@hooks/useDebounce';
import { renderHook } from '@root/test.utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');

describe('useDebounce hook', () => {
  // UNITARY TEST 1
  it('Should be defined', () => {
    // THEN
    expect(useDebounce).toBeDefined();
  });

  // UNITARY TEST 2
  it('Should return debounce value', () => {
    // WHEN
    const { result } = renderHook(() => useDebounce('debounce value'));

    // THEN
    expect(result.current).toEqual('debounce value');
  });

  // UNITARY TEST 3
  it('Should debounce with default debounce value of 500 ms', () => {
    // WHEN
    renderHook(() => useDebounce('debounce value'));

    // THEN
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  // UNITARY TEST 4
  it('Should debounce with given debounce', () => {
    // WHEN
    renderHook(() => useDebounce('debounce value', 2100));

    // THEN
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2100);
  });

  // UNITARY TEST 5
  it('Should call clearTimeout on onmount', () => {
    // WHEN
    const { unmount } = renderHook(() => useDebounce('debounce value unmount'));
    unmount();

    // THEN
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
