class ObjectSchema {
  constructor(shapes) {
    this.validators = shapes;
  }

  shape(fields) {
    return new ObjectSchema(fields);
  }

  isValid(value) {
    const keys = Object.keys(value);
    if (keys.length !== Object.keys(this.validators).length) {
      return false;
    }

    const iter = (item, key, schema) => {
      if (typeof item !== 'object' || Array.isArray(item) || item === null) {
        return schema[key].isValid(item);
      }
      const keys = Object.keys(item);
      const validator = schema[key];
      return keys.map((key) => iter(item[key], key, validator));
    };

    return keys
      .map((key) => iter(value[key], key, this.validators))
      .flat(Infinity)
      .every((val) => val);
  }
}

export default ObjectSchema;
