const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 600,
  tablet: 768,
  tabletL: 1024,
  laptop: 1025,
  laptopL: 1440,
  desktop: 1750,
  desktopL: 2560,
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS}px)`,
  mobileM: `(min-width: ${size.mobileM}px)`,
  mobileL: `(min-width: ${size.mobileL}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  tabletL: `(min-width: ${size.tabletL}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktopL}px)`,
  mobileOnly: `(max-width: ${size.tablet - 1}px)`,
};
