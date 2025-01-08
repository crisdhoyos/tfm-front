/**
 * Convierte la primera letra de un texto en mayúscula y el resto en minúscula.
 */
export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
