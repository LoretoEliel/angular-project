import * as _ from 'lodash';

export function EncryptableProperty(): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const pathProperty = '__encryptProperties';
    const separator = ',';

    const propertiesToEncrypt = _.get(target, pathProperty, '');
    const collection = _.split(propertiesToEncrypt, separator);
    collection.push(propertyKey as string);

    _.set(
      target.constructor.prototype,
      pathProperty,
      _.join(_.compact(collection), separator)
    );
  };
}
