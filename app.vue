<template>
  <div class="h-screen">
    <header class="h-1/10 bg-gray-600 p-4 text-gray-200">
      <h1 class="text-3xl">
        Rezepte
      </h1>
    </header>
    <main class="h-9/10 bg-gray-900 p-4 text-gray-200">
      <div
        v-if="!creatingNewRecipe"
      >
        <button
          class="rounded-md bg-gray-400 p-2 text-gray-600 hover:bg-gray-300"
          @click="createNewRecipe"
        >
          Neues Rezept
        </button>
        <section v-if="recipes.length" class="border-t mt-4 pt-2 flex flex-row">
          <div class="w-1/4">
            <div v-for="r, i in recipes" :key="i" class="px-4 py-2 cursor-pointer hover:bg-gray-500 w-max rounded-md text-xl" @click="currentRecipe = r">
              {{ r.name }}
            </div>
          </div>
          <div v-if="currentRecipe.name" class="w-3/4 flex flex-col gap-4">
            <h2 class="w-full text-center text-2xl">
              {{ currentRecipe.name }}
            </h2>
            <h3 class="text-lg  flex flex-row items-center">
              Tags
              <button class="ml-2 text-sm text-gray-200">
                <svg class="h-2 w-2">
                  <use xlink:href="/assets/icons/add.svg" />
                </svg>
              </button>
            </h3>
            <div class="flex flex-row flex-wrap gap-2 ">
              <div v-for="tag, i in currentRecipe.tags" :key="i" class="rounded-sm bg-teal-600 px-2 items-center flex flex-row gap-2">
                {{ tag }}
                <button class="bg-white rounded-full text-teal-800 h-4 w-4 flex items-center justify-center">
                  <img src="assets/icons/close.svg">
                </button>
              </div>
            </div>
            <h3 class="text-lg">
              Zutaten
              <button class="pl-2 text-sm">
                +
              </button>
            </h3>
            <div class="flex flex-row flex-wrap gap-2 ">
              <div v-for="tag, i in currentRecipe.tags" :key="i" class="rounded-sm bg-teal-600 px-2">
                {{ tag }}
              </div>
            </div>
            <h3 class="text-lg">
              Zubereitung
              <button class="pl-2 text-sm">
                +
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
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind.css";
import { saveAs } from "file-saver";
import { newRecipe, Recipe } from "~~/models/interfaces/Recipe";

const recipes : Recipe[] = (await import("~/assets/recipes.json")).default;

const recipe = ref(newRecipe());
const currentRecipe = ref(newRecipe());
const creatingNewRecipe = ref(false);
function createNewRecipe() {
  creatingNewRecipe.value = true;
}
function discardRecipe() {
  recipe.value = newRecipe();
  creatingNewRecipe.value = false;
}
function saveRecipe() {
  recipes.push(recipe.value);
  saveAs(new File([JSON.stringify(recipes)], "recipes.json"));
  recipe.value = newRecipe();
  creatingNewRecipe.value = false;
}
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

:root {
  font-family: "Lato", sans-serif;
}
</style>
