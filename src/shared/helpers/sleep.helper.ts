export const sleep = (time = 1000): Promise<boolean> => new Promise((res) => setTimeout(() => res(true), time));
