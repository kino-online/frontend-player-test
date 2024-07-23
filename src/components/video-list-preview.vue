<template>
  <button
    class="video-list-preview"
    :class="active && 'active'"
    :disabled="active"
    @click="$emit('click', video)"
  >
    <img class="preview-image" :src="video.preview" :alt="video.name">
    <span class="body">
      <span class="title">{{ video.name }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PlaylistItem } from '@/composables/use-player';

defineProps<{
  video: PlaylistItem
  // temp solution, list should not contain currently played video
  active: boolean,
}>();

defineEmits<{
  (e: 'click', payload: PlaylistItem): void;
}>();
</script>

<style scoped>
.video-list-preview {
  background-color: transparent;
  border: none;
  padding: 0;
  color: #fff;
  display: flex;
  cursor: pointer;
  width: 100%;

  &.active {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:hover:not(.active) {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.preview-image {
  max-width: 168px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.body {
  padding: 4px 8px;
  text-align: left;
}

.title {
  font-weight: 600;
}
</style>