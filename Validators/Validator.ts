export default interface Validator {
  validate: (...args: any) => boolean;
}
