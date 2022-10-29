<template>
	<section>
		<draggable
			:list="recipe.instructions"
			item-key="id"
			:disabled="disabled"
			class="flex flex-col gap-4"
			@start="drag = true"
			@end="drag = false"
		>
			<template #item="item">
				<section class="flex flex-row">
					<textarea
						v-if="editing === item.index"
						ref="textarea"
						v-model="recipe.instructions[item.index]"
						class="bg-gray-7 rounded rounded-r-none p-1"
						px-2
						h-20
						overflow-y-auto
						w-full
						type="text"
					/>
					<p v-else class="bg-gray-7 h-20 rounded rounded-r-none p-1" px-2 overflow-y-auto w-full cursor-default>
						{{ item.element }}
					</p>
					<div class="flex flex-col gap-1">
						<button
							v-if="editing === item.index"
							class="w-28 rounded-l-none rounded-br-none rounded bg-gray-6 hover:bg-gray-5 px-2 h-1/2 py-1"
							@click="
								disabled = false;
								editing = -1;
							"
						>
							Fertig
						</button>
						<button
							v-else
							class="w-28 rounded-l-none rounded-br-none rounded bg-gray-6 hover:bg-gray-5 px-2 h-1/2 py-1"
							@click="
								disabled = true;
								editing = item.index;
							"
						>
							Bearbeiten
						</button>
						<button
							class="w-28 rounded rounded-tr-none rounded-l-none bg-gray-6 hover:bg-gray-5 px-2 h-1/2 py-1"
							@click="removeInstruction(item.index)"
						>
							Entfernen
						</button>
					</div>
					<div class="flex flex-row items-center justify-center ml-4 cursor-pointer">
						<MoeIcon name="move" class="dragger" />
					</div>
				</section>
			</template>
			<template #footer>
				<div>
					<button bg-gray-6 hover:bg-gray-5 rounded-md p-2 flex="~ row" items-center @click="addInstruction">
						<Icon name="fa:plus" />
					</button>
				</div>
			</template>
		</draggable>
	</section>
</template>

<script setup lang="ts">
	import draggable from "vuedraggable";

	const editing = ref(-1);
	const textarea = ref();
	const drag = ref(false);
	const disabled = ref(false);

	const store = useStore();
	const recipe = store.currentRecipe;

	function addInstruction() {
		recipe.instructions.push("");
		editing.value = recipe.instructions.length - 1;
		nextTick(() => {
			(textarea.value as HTMLTextAreaElement).focus();
		});
	}

	function removeInstruction(index: number) {
		if (editing.value === index) {
			editing.value = -1;
		}
		recipe.instructions.splice(index, 1);
		if (recipe.instructions.length === 0) {
			disabled.value = false;
		}
	}
</script>
