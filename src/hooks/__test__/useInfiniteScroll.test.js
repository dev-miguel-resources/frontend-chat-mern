import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { renderHook } from '@root/test.utils';

const bodyRef = { current: document.createElement('div') };
const bottomLineRef = { current: document.createElement('div') };
const mockCallback = jest.fn();

const bodyAddEventListenerSpy = jest.spyOn(bodyRef.current, 'addEventListener');
const bodyRemoveEventListenerSpy = jest.spyOn(bodyRef.current, 'removeEventListener');

describe('useInfiniteScroll hook', () => {
  // UNITARY TEST 1
  it('Should call addEventListener', () => {
    // WHEN
    renderHook(() => useInfiniteScroll(bodyRef, bottomLineRef, mockCallback));

    // THEN
    expect(bodyAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(bodyRemoveEventListenerSpy).toHaveBeenCalledTimes(0);
  });

  // UNITARY TEST 2
  it('Should call removeEventListener', () => {
    // WHEN
    const { unmount } = renderHook(() => useInfiniteScroll(bodyRef, bottomLineRef, mockCallback));
    unmount();

    // THEN
    expect(bodyAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(bodyRemoveEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
