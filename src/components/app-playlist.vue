<template>
  <div class="playlist">
    <ul
      v-if="playlist && !isLoading"
      class="list"
    >
      <li
        class="list-item"
        v-for="item in playlist.items"
        :key="item.url"
        :class="item.url === model.src"
      >
        <video-list-preview
          :active="item.url === model.src"
          :video="item"
          @click="updateSource(item.url)"
        />
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import type { PlayerSource } from '@/composables/use-player';
import VideoListPreview from '@/components/video-list-preview.vue';
import { usePlaylist } from '@/composables/use-playlist';

const model = defineModel<PlayerSource>();

function updateSource(url: string): void {
  model.value = {
    src: url,
    type: model.value.type
  };
}

const { playlist, isLoading } = usePlaylist();
</script>

<style scoped>
.playlist {
  padding: 4px 0;
  min-width: 400px;
  flex-basis: 400px;
  flex-shrink: 1;
  flex-grow: 0;

  .list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .list-item {
  }
}
</style>