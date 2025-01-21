const isClickOutside = (
  element: HTMLElement | null,
  event: React.MouseEvent<HTMLElement, MouseEvent>
): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
};

export default isClickOutside;
