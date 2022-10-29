<template>
	<div v-if="currentRecipe" class="w-3/4 flex flex-col gap-4 p-4 relative">
		<input v-model="currentRecipe.name" class="w-96 px-2 text-2xl bg-gray-400 rounded" />
		<h3 class="text-lg flex flex-row items-center">
			Tags
			<button class="ml-2 text-sm text-teal-200" @click="edit(EditType.TAGS)">bearbeiten</button>
		</h3>
		<div class="flex flex-row flex-wrap gap-2">
			<MoeTag v-for="(tag, i) in currentRecipe.tags" :key="i" :tag="tag" />
		</div>
		<h3 class="text-lg">
			Zutaten
			<button class="ml-2 text-sm text-teal-200" @click="edit(EditType.INGREDIENTS)">bearbeiten</button>
		</h3>
		<div class="flex flex-row flex-wrap gap-2">
			<table v-if="currentRecipe.ingredients.length" class="table-fixed w-full border-collapse">
				<thead>
					<th class="w-1/3">Zutat</th>
					<th class="w-1/3">Menge</th>
					<th class="w-1/3">Notizen</th>
				</thead>
				<tbody class="border-t-2 border-b-2">
					<tr
						v-for="(ingredient, i) in currentRecipe.ingredients"
						:key="i"
						class="even:hover:bg-gray-500 even:bg-gray-600 hover:bg-gray-500"
					>
						<td
							v-tooltip="ingredient.name"
							style="text-overflow: ellipsis"
							class="w-1/3 pl-4 py-2 text-xl text-center overflow-x-hidden whitespace-nowrap"
						>
							{{ ingredient.name }}
						</td>
						<td
							v-tooltip="ingredient.amount"
							style="text-overflow: ellipsis"
							class="w-1/3 pl-4 py-2 border-r-2 text-center border-l-2 overflow-x-hidden whitespace-nowrap"
						>
							{{ ingredient.amount }}
						</td>
						<td
							v-tooltip="ingredient.notes"
							style="text-overflow: ellipsis"
							class="w-1/3 pl-4 text-center py-2 overflow-x-hidden whitespace-nowrap"
						>
							{{ ingredient.notes }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<h3 class="text-lg">
			Zubereitung
			<button class="ml-2 text-sm text-teal-200" @click="edit(EditType.INSTRUCTIONS)">bearbeiten</button>
		</h3>
		<div class="flex flex-row flex-wrap gap-2">
			<ol class="list-decimal pl-4">
				<li v-for="(instruction, i) in currentRecipe.instructions" :key="i">
					{{ instruction }}
				</li>
			</ol>
		</div>
		<section
			v-if="editing"
			p-4
			absolute
			top-16
			bg-gray-8
			text-gray-3
			w-full
			left-0
			flex="~ col gap-4"
			style="height: calc(100% - 4rem)"
		>
			<header flex="~ row" justify-between items-center>
				<span text-2xl>{{ editType }}</span>
				<button bg-gray-6 hover:bg-gray-5 rounded-md p-2 flex="~ row" items-center @click="editing = false">
					<Icon name="fa:close" />
				</button>
			</header>
			<main>
				<component :is="editComponent" />
			</main>
		</section>
	</div>
	<div v-else></div>
</template>

<script setup lang="ts">
	import { Ref } from "vue";

	enum EditType {
		TAGS = "Tags",
		INGREDIENTS = "Zutaten",
		INSTRUCTIONS = "Anweisungen",
	}
	const store = useStore();

	store.selectRecipe(useRoute().params.id.toString());

	const editing = ref(false);
	const editType: Ref<EditType> = ref(null);
	const editComponent = computed(() => {
		switch (editType.value) {
			case EditType.TAGS:
				return resolveComponent("MoeEditTags");
			case EditType.INGREDIENTS:
				return resolveComponent("MoeEditIngredients");
			case EditType.INSTRUCTIONS:
				return resolveComponent("MoeEditInstructions");
		}
	});

	const currentRecipe = store.currentRecipe;

	function edit(type: EditType) {
		this.editing = true;
		this.editType = type;
	}
</script>
