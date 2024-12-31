export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as any);
};
