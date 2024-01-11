export function isEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function checkPassword(value?: string): string {
  if (!value) {
    return "Please fill out this field";
  } else if (value.length < 6) {
    return "Password length must be not less than 6 characters";
  } else if (value.length > 99) {
    return "Password is too long";
  } else if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)(?=.*[!@#$%^&*]).{6,}/.test(value)) {
    return "Password must contain both upper-case and lower-case letters, one number and one special character";
  }
  return "";
}

export function checkConfirmPassword(
  value?: string,
  password?: string
): string {
  if (!value) {
    return "Confirm password is required";
  } else if (value !== password) {
    return "Passwords do not match";
  }
  return "";
}

export function validatePassword(
  password: string,
  confirmPassword: string
): string {
  let errMessage = "";
  errMessage = checkPassword(password);
  if (errMessage) return errMessage;

  errMessage = checkConfirmPassword(password, confirmPassword);
  if (errMessage) return errMessage;

  return errMessage;
}
