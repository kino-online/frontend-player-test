<script setup lang="ts">
import AppPlayer from './components/app-player.vue';
import SourceInput from '@/components/source-input.vue';
import { ref } from 'vue';

const source = ref(import.meta.env.VITE_S3_URL);
</script>

<template>
  <div class="app">
    <source-input v-model="source" />

    <app-player :source="{
      src: source,
      type: 'application/x-mpegURL'
    }" />
  </div>
</template>

<style scoped>
.app {
  width: 70%;
  margin: 0 auto;
}
</style>
