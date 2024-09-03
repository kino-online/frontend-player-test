<template>
  <div class="player">
    <video ref="playerRef" class="video-js vjs-default-skin"/>
    <app-playlist v-model="sourceModel" />
  </div>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/fantasy/index.css';
import { ref, watchEffect } from 'vue';
import { type PlayerOptions, type PlayerSource, usePlayer } from '@/composables/use-player';
import AppPlaylist from '@/components/app-playlist.vue';

const props = defineProps<{
  options?: PlayerOptions,
}>();
const sourceModel = defineModel<PlayerSource>('source');

const playerRef = ref<HTMLVideoElement | null>(null);
const { player } = usePlayer(playerRef, props.options);

watchEffect(() => {
  if (!player.value) return;

  player.value.src(sourceModel.value);
  player.value.focus();
});
</script>

<style scoped>
.player {
  display: flex;
  gap: 12px;
}

.vjs_video_3-dimensions.vjs-fluid:not(.vjs-audio-only-mode) {
  min-width: 640px;
  padding: 0;
  aspect-ratio: 16 / 9;
  height: 100%;
}

@media (max-width: 1015px) {
  .player {
    flex-direction: column;
    margin: 0 -8px;
  }

  .vjs_video_3-dimensions.vjs-fluid:not(.vjs-audio-only-mode) {
    min-width: initial;
  }
}
</style>