<template>
	<section v-if="store.data.recipes.length" bg-gray-7 class="flex flex-col py-4" gap-4>
		<div
			v-for="(recipe, i) in store.data.recipes"
			:key="i"
			class="cursor-pointer hover:bg-gray-8 text-xl"
			py-2
			px-4
			h-min
			w-full
			text-gray-3
			flex="~ row"
			items-center
			justify-between
			@click="selectRecipe(recipe.id)"
		>
			{{ recipe.name || recipe.id }}
			<button bg-gray-5 p-1 rounded-md hover:bg-red-9 flex="~ row" items-center @click.stop="deleteRecipe(recipe)">
				<Icon name="fa:trash-o" />
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { Recipe } from "~~/models/interfaces/Recipe";

	const store = useStore();

	function selectRecipe(id: string) {
		store.selectRecipe(id);
	}

	function deleteRecipe(recipe: Recipe) {
		if (window.confirm(`${recipe.name} löschen?`)) {
			store.deleteRecipe(recipe.id);
			useRouter().push({ path: "/", query: useRoute().query });
		}
	}
</script>
