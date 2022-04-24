export interface Recipe {
  name: string,
  ingredients: string[],
  tags: string[],
  instructions: string[],
}

export function newRecipe() {
  return { name: "", ingredients: [], tags: [], instructions: [] };
}
