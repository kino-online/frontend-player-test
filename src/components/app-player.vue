<template>
  <div class="player">
    <video ref="playerRef" class="video-js vjs-default-skin"/>
  </div>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/fantasy/index.css';
import { ref, watchEffect } from 'vue';
import { type PlayerOptions, usePlayer } from '@/composables/use-player';

const props = defineProps<{
  options?: PlayerOptions,
  source: PlayerSource
}>();

const playerRef = ref<HTMLVideoElement | null>(null);
const { player } = usePlayer(playerRef, props.options);

watchEffect(() => {
  if (!player.value) return;

  player.value.src(props.source);
});

export type PlayerSource = {
  src: string;
  type: string;
}
</script>
