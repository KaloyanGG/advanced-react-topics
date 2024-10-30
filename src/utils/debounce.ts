export function debounce(fn: (...params: any[]) => any, delay: number) {
  let timeoutId: number | undefined;

  return function (...params: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...params);
    }, delay);
  };
}
