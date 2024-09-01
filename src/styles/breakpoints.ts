interface Breakpoints {
  readonly small: string;
  readonly mobile: string;
}

export const device = Object.freeze({
  small: 344.98,
  mobile: 479.98,
});

export const breakpoints: Breakpoints = {
  small: `(max-width: ${device.small}px)`,
  mobile: `(max-width: ${device.mobile}px)`,
};

// mobile 사이즈 참고 : https://www.browserstack.com/guide/responsive-design-breakpoints
