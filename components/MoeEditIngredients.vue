<template>
	<section flex="~ col" gap-4>
		<div flex="~ row" justify-around text-center>
			<span w="30%">Zutat</span>
			<span w="30%">Menge</span>
			<span w="30%">Notizen</span>
			<span w="10%"></span>
		</div>
		<div flex="~ col">
			<div
				v-for="(ingredient, i) in recipe.ingredients"
				:key="i"
				flex="~ row"
				py-2
				justify-around
				class="even:hover:bg-gray-600 even:bg-gray-700 hover:bg-gray-600"
			>
				<div w="30%" text-center mx-1>
					<input
						ref="name"
						v-model="ingredient.name"
						w-full
						px-2
						class="bg-gray-5 rounded"
						type="text"
						@keydown="handleKeyDown"
					/>
				</div>
				<div w="30%" text-center mx-1>
					<input v-model="ingredient.amount" w-full px-2 class="bg-gray-5 rounded" type="text" @keydown="handleKeyDown" />
				</div>
				<div w="30%" text-center mx-1>
					<input v-model="ingredient.notes" w-full px-2 class="bg-gray-5 rounded" type="text" @keydown="handleKeyDown" />
				</div>
				<div w="10%" class="px-2 text-teal-400" mx-1>
					<button @click="recipe.ingredients.splice(i, 1)">
						<button p-1 rounded-md hover:bg-red-9 flex="~ row" items-center>
							<Icon name="fa:trash-o" />
						</button>
					</button>
				</div>
			</div>
		</div>
		<div>
			<button bg-gray-6 hover:bg-gray-5 rounded-md p-2 flex="~ row" items-center @click="addIngredient">
				<Icon name="fa:plus" />
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { newIngredient } from "~~/models/interfaces/Recipe";

	const store = useStore();
	const recipe = store.currentRecipe;

	const name = ref();

	function addIngredient() {
		recipe.ingredients.push(newIngredient());
		nextTick(() => {
			(name.value as HTMLInputElement[]).at(-1)?.focus();
		});
	}

	function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case "Enter":
				addIngredient();
				break;
		}
	}
</script>
