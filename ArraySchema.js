/* eslint-disable linebreak-style */
class ArraySchema {
  validator = (value) => Array.isArray(value);

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  allIntegers() {
    const validator = (arr) => arr.every(Number.isInteger);
    return new ArraySchema([...this.validators, validator]);
  }

  custom(validatorFn) {
    if (typeof validatorFn !== 'function') {
      throw new Error('Validator must be a function');
    }
    const validator = (arr) => arr.every(validatorFn);
    return new ArraySchema([...this.validators, validator]);
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }
}

export default ArraySchema;
