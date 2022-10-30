<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<MoeHeader h-10vh />
	<client-only>
		<main v-if="store.data?.id" flex="~ row" h-90vh bg-gray-6>
			<MoeRecipeList w="25%" />
			<NuxtPage w="75%" />
		</main>
	</client-only>
</template>

<script setup lang="ts">
	import { nanoid } from "nanoid";

	const store = useStore();

	if (process.client) {
		const queryId = useRoute().query.id?.toString();
		if (!queryId) {
			const lsId = window.localStorage.getItem("id");
			if (lsId) {
				await store.load(lsId);
			} else {
				const newId = nanoid();
				store.data = { id: newId, ingredients: [], recipes: [], tags: [] };
				window.localStorage.setItem("id", newId);
			}
		} else {
			window.localStorage.setItem("id", queryId);
			await store.load(queryId);
		}
		useRouter().push({ query: null });
	}
</script>

<style>
	@import "@unocss/reset/tailwind.css";
	@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

	:root {
		font-family: "Lato", sans-serif;
	}

	body {
		@apply bg-gray-6 overflow-y-hidden;
	}
</style>
