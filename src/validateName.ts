const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

export function validateName(name: string): Boolean {
  if (!name) return false;
  name = name.trim();
  if (name.length < MIN_LENGTH || name.length > MAX_LENGTH) return false;
  if (!hasOnlyValidCharacters(name)) return false;
  return true;
}

function hasOnlyValidCharacters(name: string): boolean {
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
  return nameRegex.test(name);
}
