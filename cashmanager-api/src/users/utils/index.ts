import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

// Utilisation dans une fonction de vérification de mot de passe, par exemple
const verifyPassword = async (
  enteredPassword: string,
  userPassword: string,
): Promise<boolean> => {
  const isPasswordValid = await comparePasswords(enteredPassword, userPassword);
  return isPasswordValid;
};

export { comparePasswords, verifyPassword, hashPassword };
