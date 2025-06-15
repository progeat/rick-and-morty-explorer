type RegexKeys = 'EMAIL' | 'NAME';

type RegexObject = Record<RegexKeys, RegExp>;

export const REGEX: RegexObject = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[A-ZА-ЯЁ]+$/i,
};
