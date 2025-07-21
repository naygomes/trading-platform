const MIN_LENGTH = 5;
const MAX_LENGTH = 40;

export function validateEmail(email: string): Boolean {
  if (!email) return false;
  email = email.trim();
  if (email.length < MIN_LENGTH || email.length > MAX_LENGTH) return false;
  if (!hasOnlyValidCharacters(email)) return false;
  return true;
}

function hasOnlyValidCharacters(email: string): boolean {
  const emailRegex = /^[^\s@À-ÖØ-öø-ÿ]+@[^\s@À-ÖØ-öø-ÿ]+\.[^\s@À-ÖØ-öø-ÿ]{2,}$/;
  return emailRegex.test(email);
}
