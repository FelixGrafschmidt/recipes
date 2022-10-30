<template>
	<header class="items-center p-4 bg-gray-8 text-gray-3 flex flex-row gap-4">
		<h1 cursor-pointer class="text-3xl" @click="toHome">Rezepte</h1>
		<button class="rounded-md bg-gray-6 px-2 h-8 text-gray-3 hover:bg-gray-5" @click="save">
			<span hidden sm:block>Alles speichern</span>
			<span block sm:hidden flex="~ row" items-center>
				<Icon name="fa:save" />
			</span>
		</button>
		<button class="rounded-md bg-gray-6 px-2 h-8 text-gray-3 hover:bg-gray-5" @click="createNewRecipe">
			<span hidden sm:block>Neues Rezept</span>
			<span block sm:hidden flex="~ row" items-center>
				<Icon name="fa:plus" />
			</span>
		</button>
		<button class="rounded-md bg-gray-6 px-2 h-8 text-gray-3 hover:bg-gray-5" @click="share">
			<span hidden sm:block>Teilen</span>
			<span block sm:hidden flex="~ row" items-center>
				<Icon name="fa:share-alt" />
			</span>
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

	function share() {
		const url = new URL(window.location.href);
		url.searchParams.set("share", store.data.id);
		const data: ShareData = { url: url.toString(), title: "Meine Rezepte", text: "" };
		navigator.share(data);
	}
</script>
