import NumberSchema from './src/NumberSchema.js';
import ArraySchema from './src/ArraySchema.js';
import ObjectSchema from './src/ObjectSchema.js';

class Validator {
  number() {
    return new NumberSchema();
  }

  array() {
    return new ArraySchema();
  }

  object() {
    return new ObjectSchema();
  }
}

export default Validator;
