const urlEncode = (str, delimeter = '+') => (
  str.split(' ').join(delimeter)
);

export default urlEncode;
