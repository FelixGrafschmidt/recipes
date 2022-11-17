<template>
	<header class="items-center py-4 px-2 bg-gray-8 text-gray-3 flex flex-row gap-4">
		<a :href="home" cursor-pointer>
			<MoeLogo text-teal-6 sm:h-16 sm:w-16 h-12 w-12 />
		</a>
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

	function share() {
		const url = new URL(window.location.href);
		url.searchParams.set("share", store.data.id);
		const data: ShareData = { url: url.toString(), title: "Meine Rezepte", text: "" };
		navigator.share(data);
	}

	const home = computed(() => {
		if (process.server) {
			// How the hell do I find out whether or not it is an https request on the server?
			const protocol = "http";
			const hostname = useRequestHeaders().host;
			return `${protocol}://${hostname}`;
		} else {
			const url = new URL(window.location.href);
			url.pathname = "";
			url.search = "";
			url.host = url.host.split(".").slice(1).join(".");
			return url.toString();
		}
	});
</script>
