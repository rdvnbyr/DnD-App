import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null && delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      tick();
    }
  }, [delay]);
};

export function useDebounce(callback: Function, timeout: number = 200, deps: Array<any> = []) {
  const data = useRef({ firstTime: true });
  useEffect(() => {
    const { firstTime, clearFunc } = data.current;

    const handler = setTimeout(() => {
      if (clearFunc && typeof clearFunc === 'function') {
        clearFunc();
      }
      data.current.clearFunc = callback();
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [timeout, ...deps]);
}

export const useThrottle = (callback: Function, delay: number = 200, deps: Array<any> = []) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - lastRan.current >= delay) {
        callback();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};
