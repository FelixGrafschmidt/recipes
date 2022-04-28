<template>
	<div class="rounded bg-teal-600 px-2 items-center flex flex-row gap-2">
		{{ tag }}
		<button class="bg-white rounded-full text-teal-800 h-4 w-4 flex items-center justify-center">
			<MoeIcon name="close" />
		</button>
	</div>
</template>

<script setup lang="ts">
defineProps({ tag: { type: String, required: true } });
</script>
