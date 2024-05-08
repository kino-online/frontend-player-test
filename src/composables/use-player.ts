import type { Ref } from 'vue';
import { onMounted, shallowRef } from 'vue';
import videojs from 'video.js';

export type PlayerOptions = Parameters<typeof videojs>[1];
export type Player = ReturnType<typeof videojs>;

const defaultOptions: PlayerOptions = {
  aspectRatio: '16:9',
  height: window.outerHeight,
  width: window.outerWidth,
  controls: true,
  autoplay: false,
  sources: [],
  controlBar: {
    progressControl: true,
    fullscreenToggle: true,
    pictureInPictureToggle: false,
    remainingTimeDisplay: true,
    seekToLive: false,
    durationDisplay: true,
    currentTimeDisplay: true,
  },
  userActions: {
    hotkeys: true,
  }
};

export const usePlayer = (
  playerRef: Ref<HTMLVideoElement | null>,
  optionOverrides?: Partial<PlayerOptions>,
) => {
  const player = shallowRef<Player | null>(null);

  const options = optionOverrides ? { ...defaultOptions, ...optionOverrides } : defaultOptions;
  onMounted(() => {
    if (!playerRef.value) return;

    player.value = videojs(playerRef.value, options);
  });

  return { player };
};

