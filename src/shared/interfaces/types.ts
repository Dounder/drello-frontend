type Unit = '%' | 'px' | 'em' | 'vh' | 'vh' | 'rem' | '';

export type CssUnit = `${number}${Unit}`;

export type Position = 'top left' | 'top right' | 'bottom left' | 'bottom right';

export type notifyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center';

export type InputTypes =
  | 'number'
  | 'text'
  | 'date'
  | 'email'
  | 'file'
  | 'password'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'textarea'
  | undefined;
