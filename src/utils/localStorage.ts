export const saveToLocalStorage = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as any);
};
