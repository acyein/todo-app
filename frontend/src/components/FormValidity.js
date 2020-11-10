export const validEmailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

export const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach(value => {
    if (value.length > 0) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  Object.values(rest).forEach(value => {
    if (value === null) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  console.log(isValid);
  return isValid;
};