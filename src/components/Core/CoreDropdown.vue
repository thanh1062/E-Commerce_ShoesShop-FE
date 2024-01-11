<template>
	<Dropdown :value="modelValue" :options="options" :placeholder=placeholder :class=style  @input="onChange" />
</template>
<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

export interface CoreDropdownProps {
	modelValue: Object;
	options: string[];
	placeholder?: string;
	style?: string
	onChange?: () => void
}

const props = defineProps<CoreDropdownProps>();

</script>