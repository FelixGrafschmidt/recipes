<template>
	<section px-2>
		<draggable
			:list="recipe!.instructions"
			item-key="id"
			:disabled="disabled"
			handle=".handle"
			class="flex flex-col gap-4"
			@start="drag = true"
			@end="drag = false"
		>
			<template #item="item">
				<section class="flex flex-row">
					<textarea
						ref="textarea"
						v-model="recipe!.instructions[item.index]"
						focus:outline-none
						class="bg-gray-7 rounded rounded-r-none p-1"
						px-2
						h-20
						w-full
						type="text"
					/>
					<div class="flex flex-col gap-1">
						<button class="w-22 rounded-r bg-gray-6 hover:bg-gray-5 px-2 h-full" @click="removeInstruction(item.index)">
							Entfernen
						</button>
					</div>
					<div class="flex flex-row items-center justify-center ml-4 cursor-pointer handle">
						<Icon name="fa-solid:grip-lines" class="dragger" />
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

	const textarea = ref();
	const drag = ref(false);
	const disabled = ref(false);

	const store = useStore();
	const recipe = store.currentRecipe;

	function addInstruction() {
		recipe!.instructions.push("");
		nextTick(() => {
			(textarea.value as HTMLTextAreaElement).focus();
		});
	}

	function removeInstruction(index: number) {
		recipe!.instructions.splice(index, 1);
		if (recipe!.instructions.length === 0) {
			disabled.value = false;
		}
	}
</script>
