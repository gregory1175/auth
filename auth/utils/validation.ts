export const validateUsername = (username: string): string | null => {
  if (!username) {
    return "Логин не может быть пустым";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Пароль не может быть пустым";
  }
  return null;
};
