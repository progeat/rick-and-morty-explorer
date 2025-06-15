type MinMaxLengthConfig = {
  MIN_LENGTH: number;
  MAX_LENGTH?: number;
};

type ValidationConstants = {
  PASSWORD: MinMaxLengthConfig;
  NAME: MinMaxLengthConfig;
  LOGIN: MinMaxLengthConfig;
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
