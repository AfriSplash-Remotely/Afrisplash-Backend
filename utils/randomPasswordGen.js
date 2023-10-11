function generateRandomPassword() {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '!@#$%^&*';

  // Randomly select one character from each character set
  const randomLowercase = lowercaseChars.charAt(
    Math.floor(Math.random() * lowercaseChars.length)
  );
  const randomUppercase = uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length)
  );
  const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
  const randomSpecialChar = specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  // Generate the remaining characters randomly
  const remainingChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let randomChars = '';
  for (let i = 0; i < 4; i++) {
    randomChars += remainingChars.charAt(
      Math.floor(Math.random() * remainingChars.length)
    );
  }

  // Shuffle all the selected characters
  const allChars =
    randomLowercase +
    randomUppercase +
    randomDigit +
    randomSpecialChar +
    randomChars;
  const shuffledChars = allChars
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return shuffledChars;
}

module.exports = generateRandomPassword;
