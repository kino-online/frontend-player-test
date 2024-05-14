<script setup lang="ts">
defineOptions({
  name: 'player-loader',
});
</script>

<template>
  <div class="player-loader">
    Loading...
  </div>
</template>

<style scoped>
.player-loader {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
}
</style>