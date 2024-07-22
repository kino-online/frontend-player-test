import type { Ref } from 'vue';
import { onMounted, shallowRef } from 'vue';
import videojs from 'video.js';

export type PlayerOptions = Parameters<typeof videojs>[1];
export type Player = ReturnType<typeof videojs>;

type UnitOfWork = (...args: any[]) => undefined | true;

export const defaultOptions: PlayerOptions = {
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
    skipButtons: {
      forward: 10,
      backward: 10,
    },
  },
  userActions: {
    hotkeys: true
  }
};

export function usePlayer(
  playerRef: Ref<HTMLVideoElement | null>,
  optionOverrides?: Partial<PlayerOptions>
) {
  const player = shallowRef<Player | null>(null);

  const options = optionOverrides ? { ...defaultOptions, ...optionOverrides } : defaultOptions;
  onMounted(() => {
    if (!playerRef.value) return;

    player.value = createPlayer(playerRef.value, options);
    player.value.focus();
  });

  return { player };
}

function createPlayer(element: HTMLElement, options: Partial<PlayerOptions>): Player {
  const player = videojs(element, options);
  player.on('xhr-hooks-ready', () => {
    (player.tech() as any).vhs.xhr.onRequest((options: any) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers['x-minio-extract'] = 'true';

      return options;
    });
  });

  player.on('ready', () => {
    bindEventListeners(player);
  });

  if (import.meta.env.DEV) {
    (window as any).p = player;
  }

  return player;
}

export function bindEventListeners(player: Player) {
  const root = player.el();
  const handlers: UnitOfWork[] = [
    handleSkipButtons,
    handleToStartButton,
    handleVolumeButtons,
    handleForwardBack,
  ];

  root.addEventListener('keydown', (event: KeyboardEvent) => {
    handlers.some((handler) => handler(event, player));
  });
}

function handleToStartButton(event: KeyboardEvent, player: Player): undefined | true {
  if (event.key === 'Num0' || event.key === '0') {
    player.currentTime(0);
    return true;
  }
}

function handleSkipButtons(event: KeyboardEvent, player: Player): undefined | true {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  const SKIP_AMOUNT = 10;
  const direction = event.key === 'ArrowLeft' ? -1 : 1;
  player.currentTime(player.currentTime() + direction * SKIP_AMOUNT);

  return true;
}

function handleVolumeButtons(event: KeyboardEvent, player: Player): undefined | true {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
    return;
  }

  const VOLUME_DELTA = 0.1;
  const direction = event.key === 'ArrowDown' ? -1 : 1;
  player.volume(player.volume() + VOLUME_DELTA * direction);

  return true;
}

function handleForwardBack(event: KeyboardEvent, player: Player): undefined | true {
  if (event.code !== 'Comma' && event.code !== 'Period') {
    console.log('wrong event');
    return;
  }

  if (!player.paused()) {
    console.log('not paused');
    return;
  }

  const tech = player.tech() as any;
  const { vhs } = tech;
  if (!vhs) {
    return;
  }

  let frameRate = 24; // assume 24 fps by default
  const currentTime = player.currentTime();
  const { attributes } = tech.vhs.playlists.media();

  if (attributes['FRAME-RATE']) {
    frameRate = Number(attributes['FRAME-RATE']);
  }

  const frameLength = 1 / frameRate;

  const currentFrame = Math.ceil(currentTime / frameLength);
  const newFrame = event.code === 'Comma'
    ? currentFrame - 1
    : currentFrame + 1;
  const newTime = newFrame * frameLength;

  player.currentTime(newTime);

  return true;
}