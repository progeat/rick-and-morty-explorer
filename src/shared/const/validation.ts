type RegexKeys = 'EMAIL' | 'NAME';

type RegexObject = Record<RegexKeys, RegExp>;

type MinMaxLengthConfig = {
  MIN_LENGTH: number;
  MAX_LENGTH?: number;
};

type ValidationConstants = {
  PASSWORD: MinMaxLengthConfig;
  NAME: MinMaxLengthConfig;
  LOGIN: MinMaxLengthConfig;
};

export const REGEX: RegexObject = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME: /^[A-ZА-ЯЁ]+$/i,
};

export const VALIDATION_CONSTANTS: ValidationConstants = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 30,
  },
  NAME: {
    MIN_LENGTH: 2,
  },
  LOGIN: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
  },
};
