export const extract = (obj, schema) => {
  if (typeof schema === "string") {
    return obj[schema];
  }

  if (Array.isArray(schema)) {
    return schema.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  }

  if (typeof schema === "object") {
    return Object.entries(schema).reduce((acc, [key, value]) => {
      if (Array.isArray(obj[key])) {
        acc[key] = obj[key].map((item) => extract(item, value));
      } else if (typeof value === "string") {
        acc[key] = obj[value];
      } else {
        acc[key] = extract(obj[key], value);
      }
      return acc;
    }, {});
  }
};
