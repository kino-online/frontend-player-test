<script setup lang="ts">
import AppPlayer from './components/app-player.vue';
import SourceInput from '@/components/source-input.vue';
import { ref } from 'vue';

const source = ref('https://d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8')
</script>

<template>
  <div>
    <source-input v-model="source" />

    <app-player :source="{
      src: source,
      type: 'application/x-mpegURL'
    }" />
  </div>
</template>
