/**
 * Waits for given time of milliseconds
 * @param {number} ms milliseconds to wait
 */

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
