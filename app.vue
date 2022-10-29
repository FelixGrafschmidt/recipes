<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<MoeHeader h-10vh />
	<main flex="~ row" h-90vh bg-gray-5>
		<MoeRecipeList w="25%" />
		<NuxtPage w="75%" />
	</main>
</template>

<script setup lang="ts">
	import { nanoid } from "nanoid";

	const store = useStore();

	if (!useRoute().query.id?.toString()) {
		store.data = { id: nanoid(), ingredients: [], recipes: [], tags: [] };
		useRouter().push({ path: "/", query: { id: store.data.id } });
	} else {
		await store.load(useRoute().query.id?.toString());
	}
</script>

<style>
	@import "@unocss/reset/tailwind.css";
	@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

	:root {
		font-family: "Lato", sans-serif;
	}
</style>
