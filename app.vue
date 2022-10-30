<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<MoeHeader h-10vh />
	<client-only>
		<main v-if="!largeScreen" relative>
			<section flex="~ row" items-start absolute top-0 z-10>
				<MoeRecipeList v-if="listOpen" max-w-16rem min-h-90vh @close="listOpen = false" />
				<button v-if="store.data.recipes.length">
					<Icon
						:name="listOpen ? 'fa:chevron-left' : 'fa:chevron-right'"
						bg-gray-5
						h-8
						w-8
						text-gray-3
						p-2
						rounded-br-md
						@click="listOpen = !listOpen"
					/>
				</button>
			</section>
			<NuxtPage min-h-90vh />
		</main>
		<main v-else-if="store.data?.id" flex="~ row" h-90vh bg-gray-6>
			<MoeRecipeList w="25%" />
			<NuxtPage w="75%" />
		</main>
	</client-only>
</template>

<script setup lang="ts">
	import { nanoid } from "nanoid";

	const store = useStore();
	const largeScreen = useMediaQuery("(min-width: 640px)");

	const listOpen = ref(false);

	if (process.client) {
		const shareId = useRoute().query.share?.toString();
		if (shareId) {
			await store.load(shareId);
		} else {
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
	}
</script>

<style>
	@import "@unocss/reset/tailwind.css";
	@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

	:root {
		font-family: "Lato", sans-serif;
	}

	body {
		@apply bg-gray-6 sm:overflow-y-hidden;
	}
</style>
