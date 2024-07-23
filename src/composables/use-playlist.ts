import { onMounted, ref } from 'vue';
import type { Playlist, PlaylistItem } from '@/composables/use-player';
import { getRequest } from '@/request';

export function usePlaylist() {
  const playlist = ref<Playlist | null>(null);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const items = await getRequest<PlaylistItem[]>('/list');
      hydrateItems(items);

      playlist.value = { items };
    } catch (error) {
      playlist.value = null;
    } finally {
      isLoading.value = false;
    }
  });

  return {
    playlist,
    isLoading
  };
}

function hydrateItems(items: PlaylistItem[]) {
  items.forEach(item => {
    item.preview = import.meta.env.VITE_STUB_PREVIEW;
  });
}
