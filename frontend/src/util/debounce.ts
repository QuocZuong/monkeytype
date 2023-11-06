/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Debounce a function.
 * @param {Function} func the function to debounce. 
 * @param {number} delay the delay time
 * @returns {Function} the debounced function.
 */
function debounce(func: (...args: any[]) => unknown, delay: number): (...args: any[]) => unknown {
  let ref: NodeJS.Timeout | undefined = undefined;

  return function (...args: any[]) {
    clearTimeout(ref);

    ref = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default debounce;