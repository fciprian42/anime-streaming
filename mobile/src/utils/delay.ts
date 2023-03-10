/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */

export const delay = (ms: number): Promise<unknown> =>
  new Promise(resolve => setTimeout(resolve, ms));
