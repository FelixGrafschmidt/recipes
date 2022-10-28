<template>
	<section>
		<draggable
			:list="instructions"
			item-key="id"
			:disabled="disabled"
			class="flex flex-col gap-4"
			@start="drag = true"
			@end="drag = false"
		>
			<template #item="item">
				<section class="flex flex-row w-1/2 h-1/4">
					<textarea
						v-if="editing === item.index"
						ref="textarea"
						v-model="instructions[item.index]"
						class="bg-gray-700 rounded rounded-r-none p-1 w-48"
						type="text"
					/>
					<p v-else class="bg-gray-700 rounded rounded-r-none p-1 w-48">
						{{ item.element }}
					</p>
					<div class="flex flex-col gap-1">
						<button
							v-if="editing === item.index"
							class="w-28 rounded-l-none rounded-br-none rounded bg-gray-400 px-2 h-1/2 py-1"
							@click="
								disabled = false;
								editing = -1;
							"
						>
							Fertig
						</button>
						<button
							v-else
							class="w-28 rounded-l-none rounded-br-none rounded bg-gray-400 px-2 h-1/2 py-1"
							@click="
								disabled = true;
								editing = item.index;
							"
						>
							Bearbeiten
						</button>
						<button
							class="w-28 rounded rounded-tr-none rounded-l-none bg-gray-400 px-2 h-1/2 py-1"
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
				<button class="rounded bg-gray-400 px-2 py-1 w-1/5" @click="addInstruction">Schritt hinzufügen</button>
			</template>
		</draggable>
	</section>
</template>

<script setup lang="ts">
	import { PropType, Ref } from "vue";
	import draggable from "vuedraggable";

	const props = defineProps({ instructionsProp: { type: Array as PropType<Array<string>>, default: () => [] } });
	const editing = ref(-1);
	// TODO: Why does this not turn into an array???
	const textarea = ref();
	const drag = ref(false);
	const disabled = ref(false);
	const instructions: Ref<string[]> = ref(props.instructionsProp);

	function addInstruction() {
		instructions.value.push("");
		editing.value = instructions.value.length - 1;
		nextTick(() => {
			(textarea.value as HTMLTextAreaElement).focus();
		});
	}

	function removeInstruction(index: number) {
		if (editing.value === index) {
			editing.value = -1;
		}
		instructions.value.splice(index, 1);
		if (instructions.value.length === 0) {
			disabled.value = false;
		}
	}
</script>
