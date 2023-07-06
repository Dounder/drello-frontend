export const requiredField = (val: string) => !!val || '* Field is required';

export const minLength = (val: string, len = 6) => val.length >= len || `Field must be at least ${len} characters`;

export const maxLength = (val: string, len = 20) => val.length <= len || `Field must be less than ${len} characters`;

export const email = (val: string) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(val) || 'Email must be valid';
};
