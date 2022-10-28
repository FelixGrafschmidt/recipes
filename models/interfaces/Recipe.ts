import { nanoid } from "nanoid";

export interface Ingredient {
	name: string;
	amount: string;
	notes: string;
}

export interface Recipe {
	name: string;
	id: string;
	image: string;
	ingredients: Ingredient[];
	tags: string[];
	instructions: string[];
}

export interface Data {
	id: string;
	recipes: Recipe[];
	tags: string[];
	ingredients: Ingredient[];
}

export function newRecipe(): Recipe {
	return { name: "", image: "", id: nanoid(), ingredients: [], tags: [], instructions: [] };
}
export function newIngredient(): Ingredient {
	return { name: "", amount: "", notes: "" };
}
