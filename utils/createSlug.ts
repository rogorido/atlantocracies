/**
 * Create a slug from the input place by removing special characters, converting to lowercase, and replacing spaces with dashes.
 *
 * @param {string} place - the input place to create a slug from
 * @return {string} the generated slug
 *
 * This code defines a function createSlug that generates a slug
 * from a given input string by converting it to lowercase,
 * removing special characters, and replacing spaces with dashes.
 */
export function createSlug(place: string): string {
  // Eliminar caracteres especiales y convertir a minúsculas
  let slug: string = place
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  // Reemplazar espacios con guiones
  slug = slug.replace(/\s+/g, "-");
  return slug;
}
