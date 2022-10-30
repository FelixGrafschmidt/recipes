<template>
	<header class="items-center p-4 bg-gray-8 text-gray-3 flex flex-row gap-4">
		<h1 cursor-pointer class="text-3xl" @click="toHome">Rezepte</h1>
		<button hidden sm:block class="rounded-md bg-gray-6 px-2 h-8 text-gray-3 hover:bg-gray-5" @click="save">Alles speichern</button>
		<button hidden sm:block class="rounded-md bg-gray-6 px-2 h-8 text-gray-3 hover:bg-gray-5" @click="createNewRecipe">
			Neues Rezept
		</button>
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

	function toHome() {
		store.currentRecipe = null;
		useRouter().push("/");
	}
</script>
