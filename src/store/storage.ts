/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const getObject = <T>(parameter: string): any => {
  const value = localStorage.getItem(parameter);

  if (!value) return null;

  try {
    const parsed = JSON.parse(value);

    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as T;
    }

    return value; // Se não for um objeto, retorna como string normal
  } catch (error) {
    return value; // Caso o Json.parse não funcione retorna a string normal
  }
};

export const setObject = <T>(key: string, value: T): void => {
  try {
    const storedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, storedValue as string);
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export const removeObject = (key: string): void => {
  localStorage.removeItem(key);
};
