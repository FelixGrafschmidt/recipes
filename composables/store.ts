import { Ref } from "nuxt/dist/app/compat/capi";
import { defineStore } from "pinia";
import { Data, newRecipe } from "~~/models/interfaces/Recipe";

export const useStore = defineStore("store", () => {
	const data: Ref<Data> = ref(null);
	async function save() {
		try {
			await $fetch("/api/recipes?id=" + data.value.id, { body: data.value, method: "POST" });
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
		data.value.recipes.push(recipe);
		useRouter().push({ path: "/" + recipe.id, query: useRoute().query });
	}

	return { data, save, load, create };
});
