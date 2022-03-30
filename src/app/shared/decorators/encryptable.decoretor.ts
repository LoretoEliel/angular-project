import * as _ from 'lodash';

export function Encryptable(): ClassDecorator {
  return (constructor: Function) => {
    const path = '__encrypt';
    _.set(constructor.prototype, path, true);
  };
}
