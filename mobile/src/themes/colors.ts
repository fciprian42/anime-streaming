type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX | string;

export interface Theme {
  background: Color;
  primary: Color;
  secondary: Color;
  backdrop: Color;
  button: Color;
  border: Color;
  text: Color;
  textBody: Color;
  input: Color;
  inputSelection: Color;
}

export const darkPalette: Theme = {
  background: '#181A20',
  primary: '#E21221',
  secondary: '#FFF',
  backdrop: '24, 26, 32',
  button: '#fff',
  text: '#fff',
  textBody: '#fff',
  border: 'rgba(53, 56, 63, 1)',
  input: 'rgba(31, 34, 42, 1)',
  inputSelection: 'rgba(158, 158, 158, 1)',
};

export const lightPalette: Theme = {
  background: '#FFF',
  primary: '#A2B2FC',
  secondary: '#35383F',
  backdrop: '10, 10, 10',
  button: '#fff',
  text: '#fff',
  textBody: 'rgb(66, 66, 66)',
  border: 'rgba(238, 238, 238, 1)',
  input: 'rgba(250, 250, 250, 1)',
  inputSelection: 'rgba(158, 158, 158, 1)',
};

export type Colors = keyof typeof darkPalette;

export const colors = { lightPalette, darkPalette };
