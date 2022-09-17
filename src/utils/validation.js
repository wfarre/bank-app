/**
 * set an error message if the input is not valid
 * @params input
 * @params type (e.g.: `email`)
 * @params object of error messages
 * @returns object of error messages
 */
export function checkIfInputIsValid(input, type, errorMsg) {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  let errors = { ...errorMsg };

  if (input === "") {
    errors = { ...errors, [type]: "Please enter your " + type + "." };
  }
  if (input !== "") {
    if (type === "email") {
      if (!input.match(emailPattern)) {
        errors = {
          ...errors,
          [type]: "Please enter a correct " + type + ". (eg: email@email.com)",
        };
      }
    }
    if (type === "password") {
      if (!input.match(passwordPattern)) {
        errors = {
          ...errors,
          [type]: "Please enter a correct " + type + ".",
        };
      }
    }
  }
  return errors;
}
