<template>
	<table class="table-fixed w-full border-collapse">
		<thead>
			<th class="w-[30%]">
				Zutat
			</th>
			<th class="w-[30%]">
				Menge
			</th>
			<th class="w-[30%]">
				Notizen
			</th>
			<th class="w-[10%]" />
		</thead>
		<tbody class="border-t-2 border-b-2">
			<tr v-for="ingredient, i in ingredients" :key="i" class="even:hover:bg-gray-500 even:bg-gray-600 hover:bg-gray-500">
				<td class="w-[30%] pl-4 py-2">
					<input ref="name" v-model="ingredient.name" class="bg-gray-700 rounded" type="text" @keydown="handleKeyDown">
				</td>
				<td class="w-[30%] pl-4 py-2 border-r-2 border-l-2">
					<input v-model="ingredient.amount" class="bg-gray-700 rounded" type="text" @keydown="handleKeyDown">
				</td>
				<td class="w-[30%] pl-4 py-2 border-r-2">
					<input v-model="ingredient.notes" class="bg-gray-700 rounded" type="text" @keydown="handleKeyDown">
				</td>
				<td class="w-[10%] pl-4 py-2 text-teal-400">
					<button @click="ingredients.splice(i, 1)">
						Entfernen
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	<div>
		<button class="rounded bg-gray-400 px-2 py-1" @click="addIngredient">
			Neue Zutat
		</button>
	</div>
</template>

<script setup lang="ts">
import { PropType, Ref } from "vue";
import { Ingredient, newIngredient } from "~~/models/interfaces/Recipe";

const props = defineProps({ ingredientsProp: { type: Array as PropType<Array<Ingredient>>, default: () => [] } });
const name = ref();
const ingredients: Ref<Ingredient[]> = ref(props.ingredientsProp);

function addIngredient() {
	ingredients.value.push(newIngredient());
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
