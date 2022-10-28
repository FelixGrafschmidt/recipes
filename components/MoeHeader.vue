<template>
	<header class="h-16 items-center bg-gray-700 p-4 text-gray-200 flex flex-row gap-4">
		<h1 class="text-3xl">Rezepte</h1>
		<button class="rounded-md bg-gray-400 px-2 h-8 text-gray-600 hover:bg-gray-300" @click="save">Alles speichern</button>
		<button class="rounded-md bg-gray-400 px-2 h-8 text-gray-600 hover:bg-gray-300" @click="createNewRecipe">Neues Rezept</button>
	</header>
</template>

<script setup lang="ts">
	const store = useStore();
	function createNewRecipe() {
		store.create();
	}
	async function save() {
		await store.save();
	}
</script>
