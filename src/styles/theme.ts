const colors = {
  grey: '#9ca3ae',
  grey_hover: '#F3F4F5',
  grey_border: '#E3E7EB',
  blue: '#3B82F6',
  black_header: '#000000D9',
  black_p: '#1A1311',
};

const pixelToRem = (size: number) => `${size / 14}rem`;

const fontSizes = {
  base: pixelToRem(14),
  lg: pixelToRem(15.75),
  subtitle: pixelToRem(21),
  title: pixelToRem(31.5),
};

const theme = {
  colors,
  fontSizes,
};

export default theme;
