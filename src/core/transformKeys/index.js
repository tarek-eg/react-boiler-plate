import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

const transform = (body, transformFn) => {
  const transformObj = (obj) => {
    each(obj, (value, key) => {
      delete obj[key];
      obj[transformFn(key)] = value;
      if (!isString(value)) {
        transformObj(value);
      }
    });
  };

  if (isArray(body)) {
    each(body, (obj) => {
      transformObj(obj);
    });
  } else if (isObject(body)) {
    transformObj(body);
  }

  return body;
};

const transformKeys = {
  toCamelCase: (body) => {
    return isEmpty(body) ? body : transform(body, camelCase);
  },
  toKebabCase: (body) => {
    return isEmpty(body) ? body : transform(body, kebabCase);
  },
};

export default transformKeys;
