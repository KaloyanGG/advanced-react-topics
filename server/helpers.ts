export function id<T extends { id: number }>(items: T[]): number {
  return (
    items.reduce<number>((accumulator: number, currentValue: T) => {
      return accumulator > currentValue.id ? accumulator : currentValue.id;
    }, -1) + 1
  );
}
