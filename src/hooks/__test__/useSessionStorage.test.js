import useSessionStorage from '@hooks/useSessionStorage';
import { renderHook } from '@root/test.utils';

describe('useSessionStorage hook', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  // UNITARY TEST 1
  it('Should return empty string', () => {
    // WHEN
    const { result } = renderHook(() => useSessionStorage('key', 'get'));

    // THEN
    expect(result.current).toBe('');
  });

  // UNITARY TEST 2
  it('Should return value', () => {
    // GIVEN
    window.sessionStorage.setItem('key', JSON.stringify('storage value'));

    // WHEN
    const { result } = renderHook(() => useSessionStorage('key', 'get'));

    // THEN
    expect(result.current).toBe('storage value');
  });

  // UNITARY TEST 3
  it('Should set value and get', () => {
    // WHEN
    const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
    const [setState] = first.current;
    setState('Another value');
    const { result: second } = renderHook(() => useSessionStorage('key', 'get'));

    // THEN
    expect(second.current).toBe('Another value');
  });

  // UNITARY TEST 4
  describe('Delete', () => {
    // GIVEN
    let storageValue;
    beforeEach(() => {
      const { result: first } = renderHook(() => useSessionStorage('key', 'set'));
      const [setState] = first.current;
      setState('Delete value');
      const { result: second } = renderHook(() => useSessionStorage('key', 'get'));
      storageValue = second.current;
    });

    it('Should delete value', () => {
      expect(storageValue).toBe('Delete value');

      // WHEN
      const { result: third } = renderHook(() => useSessionStorage('key', 'delete'));
      const [deleteValue] = third.current;
      deleteValue();

      // THEN
      const { result: fourth } = renderHook(() => useSessionStorage('key', 'get'));
      expect(fourth.current).toBe('');
    });
  });
});
