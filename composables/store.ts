import { Ref } from "nuxt/dist/app/compat/capi";
import { defineStore } from "pinia";
import { Data, newRecipe, Recipe } from "~~/models/interfaces/Recipe";

export const useStore = defineStore("store", () => {
	const data: Ref<Data | null> = ref(null);
	const currentRecipe: Ref<Recipe | null> = ref(null);

	async function save() {
		try {
			await $fetch("/api/recipes?id=" + data.value?.id, { body: data.value, method: "POST" });
		} catch (error) {
			console.error(error);
		}
	}
	async function load(id: string) {
		try {
			data.value = await $fetch(`/api/recipes?id=${id}`);
		} catch (error) {
			console.error(error);
			data.value = { id, ingredients: [], recipes: [], tags: [] };
		}
	}
	function create() {
		const recipe = newRecipe();
		data.value?.recipes.push(recipe);
		navigateTo({ path: "/" + recipe.id });
	}

	function deleteRecipe(id: string) {
		if (!data.value) {
			return;
		}
		data.value.recipes = data.value.recipes.filter((recipe) => recipe.id !== id);
	}

	function selectRecipe(id: string) {
		if (!data.value) {
			return;
		}
		currentRecipe.value = data.value.recipes.find((recipe) => recipe.id === id) || currentRecipe.value;
		navigateTo({ path: "/" + id });
	}

	return { data, currentRecipe, save, load, create, deleteRecipe, selectRecipe };
});
