<script setup lang="ts">
import AppPlayer from './components/app-player.vue';
import SourceInput from '@/components/source-input.vue';
import { ref } from 'vue';

const source = ref('https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8')
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
