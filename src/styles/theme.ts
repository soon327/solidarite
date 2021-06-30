const colors = {
  grey: '#6b7280',
  blue: '#3B8286',
  black_header: '#000000D9',
  black_p: '#1A1311',
};

const pixelToRem = (size: number) => `${size / 16}rem`;

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
