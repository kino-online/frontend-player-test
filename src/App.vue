<script setup lang="ts">

import SourceInput from '@/components/source-input.vue';
import { defineAsyncComponent, ref } from 'vue';
import PlayerLoader from '@/components/player-loader.vue';

const AppPlayer = defineAsyncComponent(() => import('./components/app-player.vue'));

const source = ref(import.meta.env.VITE_DEFAULT_MASTER_URL);
</script>

<template>
  <div class="app">
    <source-input v-model="source" />

    <suspense>
      <app-player :source="{
        src: source,
        type: 'application/x-mpegURL'
      }" />
      <template #fallback>
        <player-loader />
      </template>
    </suspense>
  </div>
</template>

<style scoped>
.app {
  width: 70%;
  margin: 0 auto;
}
</style>
