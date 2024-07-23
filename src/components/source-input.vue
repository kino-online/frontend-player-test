<template>
  <div class="source">
    <label for="source">
      Source:
    </label>
    <input
      ref="sourceRef"
      v-model="sourceModel"
      type="url"
      name="source"
      id="source"
      required
      @keyup.enter="setSource"
    />
    <button
      type="button"
      @click="setSource"
    >
      Load
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

const sourceModel = ref(props.modelValue);
const sourceRef = ref<HTMLInputElement>();

watch(() => props.modelValue, newValue => {
  sourceModel.value = newValue;
});

const setSource = () => {
  if (!sourceModel.value) return;
  if (!sourceRef.value?.reportValidity()) return;

  emit('update:modelValue', sourceModel.value);
};
</script>

<style scoped>
.source {
  display: flex;
  align-items: center;
  padding: 4px;

  column-gap: 4px;
  width: 100%;
}

.source input {
  padding: 4px;
  flex-grow: 1;
}

.source button {
  cursor: pointer;
}

.source button, .source input, .source select {
  height: 28px;
}
</style>
