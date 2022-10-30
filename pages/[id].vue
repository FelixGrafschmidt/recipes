<template>
	<div
		v-if="currentRecipe"
		ref="content"
		class="sm:w-3/4 flex flex-col gap-4 p-4 relative"
		:scrollbar="!editing ? '~ rounded w-2 radius-2 track-radius-4 thumb-radius-4 track-color-gray-5 thumb-color-gray-8' : ''"
		:class="{ 'sm:overflow-y-auto': !editing }"
	>
		<input v-model="currentRecipe.name" class="sm:w-96 px-2 text-2xl bg-gray-5 text-gray-3 rounded" mt-8 sm:mt-0 />
		<h3 class="text-xl flex flex-row items-center text-gray-3">
			Tags
			<button hidden sm:block class="ml-2 text-sm text-teal-200" @click="edit(EditType.TAGS)">bearbeiten</button>
		</h3>
		<div v-if="currentRecipe.tags.length" class="flex flex-row flex-wrap gap-2">
			<MoeTag v-for="(tag, i) in currentRecipe.tags" :key="i" :tag="tag" />
		</div>
		<h3 class="text-xl flex flex-row items-center text-gray-3">
			Zutaten
			<button hidden sm:block class="ml-2 text-sm text-teal-200" @click="edit(EditType.INGREDIENTS)">bearbeiten</button>
		</h3>
		<div v-if="currentRecipe.ingredients.length" flex flex-col text-gray-3>
			<div flex="~ row" justify-around text-center bg-gray-7 h-8 rounded-t-md items-center border-1 py-6 font-bold>
				<span w="30%">Zutat</span>
				<span w="30%">Menge</span>
				<span w="30%">Notizen</span>
			</div>
			<div flex="~ col" rounded-b-md>
				<div
					v-for="(ingredient, i) in currentRecipe.ingredients"
					:key="i"
					flex="~ row"
					py-2
					last:rounded-b-md
					border-b-1
					border-x-1
					justify-around
					hover:bg-gray-5
					bg-gray-6
					even:bg-gray-7
					even:hover:bg-gray-5
				>
					<div w="30%" text-center>
						{{ ingredient.name }}
					</div>
					<div w="30%" text-center>
						{{ ingredient.amount }}
					</div>
					<div w="30%" text-center>
						{{ ingredient.notes }}
					</div>
				</div>
			</div>
		</div>
		<h3 class="text-xl flex flex-row items-center text-gray-3">
			Zubereitung
			<button hidden sm:block class="ml-2 text-sm text-teal-200" @click="edit(EditType.INSTRUCTIONS)">bearbeiten</button>
		</h3>
		<div class="flex flex-row flex-wrap gap-2" text-gray-3 text-lg>
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
			bg-gray-9
			text-gray-3
			w-full
			left-0
			flex="~ col gap-4"
			style="height: calc(100% - 4rem)"
		>
			<header flex="~ row" justify-between items-center>
				<span text-2xl>{{ editType }}</span>
				<button bg-gray-7 hover:bg-gray-6 rounded-md p-2 flex="~ row" items-center @click="stopEditing">
					<Icon name="fa:close" />
				</button>
			</header>
			<main overflow-y-auto scrollbar="~ rounded w-2 radius-2 track-radius-4 thumb-radius-4 track-color-gray-5 thumb-color-gray-7">
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

	const content: Ref<HTMLElement> = ref(null);

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
		content.value.scrollTo({ top: 0 });
		editing.value = true;
		editType.value = type;
	}

	function stopEditing() {
		editing.value = false;
		currentRecipe.tags = currentRecipe.tags.filter((tag) => tag);
		currentRecipe.ingredients = currentRecipe.ingredients.filter((ingredient) => ingredient.name);
		currentRecipe.instructions = currentRecipe.instructions.filter((instruction) => instruction);
	}
</script>
