import { beforeEach, describe, expect, it, vi } from 'vitest';
import videojs from 'video.js';
import { bindEventListeners, defaultOptions, type Player } from '@/composables/use-player';


describe('usePlayer', () => {
  describe('Hotkeys', () => {
    let player: Player, root: HTMLElement;
    beforeEach(() => {
      const element = document.createElement('video');

      player = videojs(element, defaultOptions);
      root = player.el() as HTMLElement;

      bindEventListeners(player);
    });

    it('should decrease volume when arrow down is pressed', async () => {
      const spy = vi.spyOn(player, 'volume').mockImplementation(() => 1);
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(spy).toHaveBeenCalledWith(0.9);
    });

    it('should increase volume when arrow up is pressed', async () => {
      const spy = vi.spyOn(player, 'volume').mockImplementation(() => 0);
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(spy).toHaveBeenCalledWith(0.1);
    });

    it('should skip forward when arrow right is pressed', async () => {
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => 0);
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(spy).toHaveBeenCalledWith(10);
    });

    it('should skip forward when arrow left is pressed', async () => {
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => 100);
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(spy).toHaveBeenCalledWith(90);
    });

    it('should reset time to zero when Num0 is pressed', async () => {
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => 100);
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Num0' }));
      expect(spy).toHaveBeenCalledWith(0);
    });
  });
});