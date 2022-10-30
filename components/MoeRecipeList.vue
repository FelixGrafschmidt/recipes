<template>
	<section v-if="store.data.recipes.length" bg-gray-7 class="flex flex-col sm:py-4" sm:gap-4 shadow>
		<div
			v-for="(recipe, i) in store.data.recipes"
			:key="i"
			class="cursor-pointer hover:bg-gray-8 sm:text-xl"
			:border-y="recipe.id === store.currentRecipe?.id ? 'teal-7' : ''"
			break-all
			border-y-gray-7
			border-y-2
			py-2
			px-4
			h-min
			w-full
			text-gray-3
			flex="~ row"
			items-center
			justify-between
			gap-2
			@click="selectRecipe(recipe.id)"
		>
			{{ recipe.name || recipe.id }}
			<button bg-gray-5 p-1 rounded-md hover:bg-red-9 sm:flex="~ row" items-center @click.stop="deleteRecipe(recipe)">
				<Icon name="fa:trash-o" />
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { Recipe } from "~~/models/interfaces/Recipe";

	const store = useStore();
	const emit = defineEmits(["close"]);

	function selectRecipe(id: string) {
		store.selectRecipe(id);
		emit("close");
	}

	function deleteRecipe(recipe: Recipe) {
		if (window.confirm(`${recipe.name} löschen?`)) {
			store.deleteRecipe(recipe.id);
			store.currentRecipe = null;
			useRouter().push({ path: "/" });
		}
	}
</script>
