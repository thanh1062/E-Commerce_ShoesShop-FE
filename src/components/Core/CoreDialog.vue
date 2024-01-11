<template>
  <Dialog v-model:visible="props.visible" :style="{ width: props.widthSize }" :position="position" modal
    :draggable="false">
    <template #header>
      <div class="dialog-header">
        <p>{{ props.header }}</p>
        <i class="pi pi-times" @click="emits('close-dialog')"></i>
      </div>
      <Divider />
    </template>

    <slot></slot>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';

export interface CoreDialogProps {
  visible?: boolean;
  header?: string;
  widthSize?: string;
  position: "center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright" | undefined;
}

const props = defineProps<CoreDialogProps>();
const emits = defineEmits(["close-dialog"]);

</script>