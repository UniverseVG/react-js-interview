// Pure JS Based

// export const useThrottle = (callback, delay) => {
//   let timeOutId = null;
//   let lastArgs = [];
//   return (...args) => {
//     lastArgs = args;
//     if (timeOutId) {
//       return;
//     }
//     timeOutId = setTimeout(() => {
//       timeOutId = null;
//       callback(lastArgs);
//     }, delay);
//   };
// };

import { useEffect } from "react";
import { useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);

  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecuted.current;

      if (timeElapsed >= delay) {
        setThrottledValue(value);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return throttledValue;
};

export default useThrottle;
