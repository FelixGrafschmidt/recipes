<template>
	<div class="relative">
		<div class="h-screen bg-gray-900">
			<header class="h-1/10 bg-gray-700 p-4 text-gray-200 flex flex-row gap-4">
				<h1 class="text-3xl">
					Rezepte
				</h1>
				<button class="rounded-md bg-gray-400 p-2 mr-4 text-gray-600 hover:bg-gray-300" @click="save">
					Alles speichern
				</button>
				<button class="rounded-md bg-gray-400 p-2 text-gray-600 hover:bg-gray-300" @click="createNewRecipe">
					Neues Rezept
				</button>
			</header>
			<main class="h-9/10 max-h-9/10 p-4 text-gray-200 overflow-y-scroll scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4">
				<div v-if="!creatingNewRecipe">
					<section v-if="data.recipes.length" class="border-t mt-4 pt-2 flex flex-row">
						<div class="w-1/4">
							<div v-for="r, i in data.recipes" :key="i" class="px-4 py-2 cursor-pointer hover:bg-gray-500 w-max rounded-md text-xl" @click="currentRecipe = r">
								{{ r.name }}
							</div>
						</div>
						<div v-if="currentRecipe.name" class="w-3/4 flex flex-col gap-4">
							<input v-model="currentRecipe.name" class="w-full text-center text-2xl bg-gray-700 rounded">
							<h3 class="text-lg  flex flex-row items-center">
								Tags
								<button class="ml-2 text-sm text-teal-200" @click="edit('tags')">
									bearbeiten
								</button>
							</h3>
							<div class="flex flex-row flex-wrap gap-2 ">
								<MoeTag v-for="tag, i in currentRecipe.tags" :key="i" :tag="tag" />
							</div>
							<h3 class="text-lg">
								Zutaten
								<button class="ml-2 text-sm text-teal-200" @click="edit('ingredients')">
									bearbeiten
								</button>
							</h3>
							<div class="flex flex-row flex-wrap gap-2">
								<table class="table-fixed w-full border-collapse">
									<thead>
										<th class="w-1/3">
											Zutat
										</th>
										<th class="w-1/3">
											Menge
										</th>
										<th class="w-1/3">
											Notizen
										</th>
									</thead>
									<tbody class="border-t-2 border-b-2">
										<tr v-for="ingredient, i in currentRecipe.ingredients" :key="i" class="even:hover:bg-gray-500 even:bg-gray-600 hover:bg-gray-500 ">
											<td v-tooltip="ingredient.name" style="text-overflow: ellipsis;" class="w-1/3 pl-4 py-2 text-xl text-center verflow-x-hidden whitespace-nowrap">
												{{ ingredient.name }}
											</td>
											<td v-tooltip="ingredient.amount" style="text-overflow: ellipsis;" class="w-1/3 pl-4 py-2 border-r-2 text-center border-l-2 verflow-x-hidden whitespace-nowrap">
												{{ ingredient.amount }}
											</td>
											<td v-tooltip="ingredient.notes" style="text-overflow: ellipsis;" class="w-1/3 pl-4 text-center py-2 overflow-x-hidden whitespace-nowrap">
												{{ ingredient.notes }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h3 class="text-lg">
								Zubereitung
								<button class="ml-2 text-sm text-teal-200" @click="edit('instructions')">
									bearbeiten
								</button>
							</h3>
							<div class="flex flex-row flex-wrap gap-2 ">
								<ol class="list-decimal pl-4">
									<li v-for="instruction, i in currentRecipe.instructions" :key="i">
										{{ instruction }}
									</li>
								</ol>
							</div>
						</div>
					</section>
				</div>
				<div v-else class="flex flex-col gap-4 text-gray-200">
					<div class="flex flex-row gap-4">
						<button class="rounded-md bg-gray-400 p-2 text-gray-600 hover:bg-gray-300" @click="saveRecipe">
							Speichern
						</button>
						<button class="rounded-md bg-gray-400 p-2 text-gray-600 hover:bg-gray-300" @click="discardRecipe">
							Verwerfen
						</button>
					</div>
					<section>
						<form class="flex flex-col gap-4">
							<label class="flex flex-col gap-2 w-min">
								<span>Name</span>
								<input v-model="recipe.name" type="text" name="name" class="rounded-md text-gray-900 px-2">
							</label>
						</form>
					</section>
				</div>
			</main>
		</div>
		<div v-if="!!editing">
			<div
				class="h-screen opacity-70 absolute inset-0"
				@click="edit('')"
			/>
			<section v-if="editing === 'tags'" class="overflow-y-scroll max-h-[80vh] absolute flex top-20 left-100 right-100 bg-gray-600 text-gray-200 rounded pb-20" @click.stop>
				<div class="flex flex-col pl-8 gap-4 pt-4">
					<h3 class="text-lg font-semibold">
						Tags bearbeiten
					</h3>
					<label class="flex flex-col">
						<span>Neuer Tag</span>
						<div class="flex flex-row">
							<input v-model="newtag" class="bg-gray-500 rounded rounded-r-none" type="text">
							<button :class="{'grayscale':!newtag}" :disabled="!newtag" class="bg-teal-600 rounded px-2 rounded-l-none" @click="addTag(newtag)">Neu</button>
						</div>
					</label>
					<h4>Aktiv</h4>
					<div class="flex flex-row gap-4">
						<MoeTag
							v-for="tag, i in currentRecipe.tags"
							:key="i"
							editing
							:tag="tag"
							hover-text="Entfernen"
							@click="currentRecipe.tags.splice(i, 1)"
						/>
					</div>
					<h4>Inaktiv</h4>
					<div class="flex flex-row gap-4">
						<MoeTag
							v-for="tag, i in [...tags].filter(tag => !currentRecipe.tags.includes(tag))"
							:key="i"
							editing
							hover-text="Hinzufügen"
							:tag="tag"
							@click="currentRecipe.tags.push(tag)"
						/>
					</div>
				</div>
			</section>
			<section v-else-if="editing === 'ingredients'" class="overflow-y-scroll max-h-[80vh] absolute flex-col flex top-20 left-40 right-40 bg-gray-600 text-gray-200 rounded pb-20" @click.stop>
				<div class="flex flex-col px-8 gap-4 pt-4">
					<h3 class="text-lg font-semibold">
						Zutaten bearbeiten
					</h3>
					<MoeIngredients :ingredients-prop="currentRecipe.ingredients" />
				</div>
			</section>
			<section v-else-if="editing === 'instructions'" class="absolute flex-col flex top-20 left-80 right-80 bg-gray-600 text-gray-200 rounded pb-20 overflow-y-scroll max-h-[80vh]" @click.stop>
				<div class="flex flex-col px-8 gap-4 pt-4">
					<h3 class="text-lg font-semibold">
						Zubereitung bearbeiten
					</h3>
					<MoeInstructions :instructions-prop="currentRecipe.instructions" />
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind.css";
import { saveAs } from "file-saver";
import { Ref } from "vue";
import { Data, newRecipe, Recipe } from "~~/models/interfaces/Recipe";

const data: Data = (await import("~/assets/data.json")).default;
const editing = ref("");
const newtag = ref("");

const tags = new Set<string>(data.tags);

const recipe = ref(newRecipe());
const currentRecipe: Ref<Recipe> = ref(newRecipe());
const creatingNewRecipe = ref(false);
function createNewRecipe() {
	creatingNewRecipe.value = true;
}
function discardRecipe() {
	recipe.value = newRecipe();
	creatingNewRecipe.value = false;
}
function saveRecipe() {
	data.recipes.push(recipe.value);
	recipe.value = newRecipe();
	creatingNewRecipe.value = false;
}
function save() {
	data.tags = [...tags];
	saveAs(new File([JSON.stringify(data)], "data.json"));
}
function addTag(newTag: string) {
	newtag.value = "";
	currentRecipe.value.tags.push(newTag);
	tags.add(newTag);
}
function edit(category: string) {
	document.body.classList.toggle("overflow-y-hidden");
	document.body.classList.toggle("overflow-y-auto");
	editing.value = category;
}
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

:root {
  font-family: "Lato", sans-serif;
}

/* body {
	@apply scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4
} */
</style>
