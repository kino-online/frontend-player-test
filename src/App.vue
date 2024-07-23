<template>
  <div class="app">
    <source-input v-model="source.src" />

    <suspense>
      <app-player
        v-model:source="source"
      />
      <template #fallback>
        <player-loader />
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">

import SourceInput from '@/components/source-input.vue';
import { defineAsyncComponent, ref } from 'vue';
import PlayerLoader from '@/components/player-loader.vue';

const AppPlayer = defineAsyncComponent(() => import('./components/app-player.vue'));

const source = ref({
  src: import.meta.env.VITE_DEFAULT_MASTER_URL,
  type: 'application/x-mpegURL',
});
</script>

<style scoped>
.app {
  max-width: 1704px;
  margin: 0 auto;
  padding: 16px;
}

@media (max-width: 1015px) {
  .app {
    margin: 0 auto;
    width: 100%;
    padding: 8px;
  }
}
</style>
