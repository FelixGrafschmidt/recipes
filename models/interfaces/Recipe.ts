
export interface Ingredient {
	name: string,
	amount: string,
	notes: string
}

export interface Recipe {
	name: string,
	image: string,
	ingredients: Ingredient[],
	tags: string[],
	instructions: string[],
}

export interface Data {
	recipes: Recipe[],
	tags: string[],
	ingredients: Ingredient[],
}

export function newRecipe(): Recipe {
	return { name: "", image: "", ingredients: new Array<Ingredient>(), tags: [], instructions: [] };
}
export function newIngredient(): Ingredient {
	return { name: "", amount: "", notes: "" };
}
