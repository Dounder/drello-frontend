export const getJWTExpireDate = (token: string) => {
  if (token) {
    const [, payload] = token.split('.');
    const { exp: expires } = JSON.parse(window.atob(payload));
    if (typeof expires === 'number') return new Date(expires * 1000);
  }
  return null;
};

export const getTimeRemaining = (endtime: Date) => {
  const total = endtime.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};
