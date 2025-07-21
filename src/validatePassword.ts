const MIN_LENGTH = 8;

export function validatePassword(password: string): Boolean {
  if (!password) return false;
  if (password.length < MIN_LENGTH) return false;
  if (!hasOnlyValidCharacters(password)) return false;
  return true;
}

function hasOnlyValidCharacters(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
