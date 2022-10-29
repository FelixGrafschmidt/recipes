<template>
	<section class="flex rounded pb-20" @click.stop>
		<div class="flex flex-col pl-8 gap-4 pt-4">
			<label class="flex flex-col">
				<span>Neuer Tag</span>
				<div class="flex flex-row">
					<input v-model="newtag" class="bg-gray-500 rounded rounded-r-none" type="text" />
					<button
						:class="{ grayscale: !newtag }"
						:disabled="!newtag"
						class="bg-teal-600 rounded px-2 rounded-l-none"
						@click="addTag(newtag)"
					>
						Neu
					</button>
				</div>
			</label>
			<h4>Aktiv</h4>
			<div class="flex flex-row gap-4">
				<MoeTag
					v-for="(tag, i) in recipe.tags"
					:key="i"
					editing
					:tag="tag"
					hover-text="Entfernen"
					@click="recipe.tags.splice(i, 1)"
				/>
			</div>
			<h4>Inaktiv</h4>
			<div class="flex flex-row gap-4">
				<MoeTag
					v-for="(tag, i) in [...tags].filter((tag) => !recipe.tags.includes(tag))"
					:key="i"
					editing
					hover-text="Hinzufügen"
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

	function addTag(tag: string) {
		tags.push(tag);
	}
</script>
