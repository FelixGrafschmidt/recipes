<template>
	<div
		v-tooltip="editing ? hoverText : ''"
		:class="{ 'cursor-pointer': editing }"
		class="rounded-xl w-max bg-teal-600 px-2 items-center flex flex-row gap-2"
	>
		{{ tag }}
	</div>
</template>

<script setup lang="ts">
	defineProps({
		tag: { type: String, required: true },
		editing: { type: Boolean, default: false },
		hoverText: { type: String, default: "" },
	});
</script>
