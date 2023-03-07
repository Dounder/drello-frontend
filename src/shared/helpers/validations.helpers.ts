export const requiredString = (val: string): string | boolean => (val !== null && val !== '') || 'Field required';

export const requiredNumber = (val: string): string | boolean => (val !== null && val !== '') || 'Field required';

export const isValidEmail = (val: string): string | boolean => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'El correo no parece ser válido';
};
