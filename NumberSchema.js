class NumberSchema {
  validator = (value) => typeof value === 'number' && !Number.isNaN(value);

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }
}

export default NumberSchema;
