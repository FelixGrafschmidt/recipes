<template>
	<section class="flex rounded" @click.stop>
		<div class="flex flex-col pl-8 gap-4 pt-4" max-w="70vw">
			<label class="flex flex-col">
				<span>Neuer Tag</span>
				<div class="flex flex-row">
					<input v-model="newtag" class="bg-gray-500 rounded rounded-r-none px-2" type="text" @keydown="keyhandler" />
					<button
						:class="{ grayscale: !newtag }"
						:disabled="!newtag"
						class="bg-teal-600 rounded px-2 rounded-l-none"
						@click="addTag"
					>
						Neu
					</button>
				</div>
			</label>
			<h4>Aktiv</h4>
			<div class="flex flex-row gap-4" overflow-x-auto>
				<MoeTag v-for="(tag, i) in recipe.tags" :key="i" editing :tag="tag" @click="recipe.tags.splice(i, 1)" />
			</div>
			<h4>Inaktiv</h4>
			<div class="flex flex-row gap-4" overflow-x-auto>
				<MoeTag
					v-for="(tag, i) in [...tags].filter((tag) => !recipe.tags.includes(tag))"
					:key="i"
					editing
					:tag="tag"
					@click="recipe.tags.push(tag)"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const store = useStore();
	const recipe = store.currentRecipe;
	const tags = store.data.tags;

	const newtag = ref("");

	function addTag() {
		tags.push(newtag.value);
		newtag.value = "";
	}

	function keyhandler(event: KeyboardEvent) {
		if (event.code === "Enter") {
			addTag();
		}
	}
</script>
