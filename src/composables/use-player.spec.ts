import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import videojs from 'video.js';
import { bindEventListeners, defaultOptions, type Player } from '@/composables/use-player';


async function timeout(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

describe('usePlayer', () => {
  describe('Hotkeys', () => {
    let player: Player, root: HTMLElement;

    beforeAll(() => {
      const noop = () => {};
      const promiseNoop = async () => {};
      window.HTMLMediaElement.prototype.load = noop;
      window.HTMLMediaElement.prototype.play = promiseNoop;
      window.HTMLMediaElement.prototype.pause = noop;
    });
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

    // TODO: mock VHS tech
    it.todo('should skip forward one frame when the `.` is pressed', async () => {
      const frameLength = 1 / 24;
      const startTime = 100;

      player.pause();
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => startTime);
      root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Period' }));
      expect(spy).toHaveBeenCalledWith(startTime + frameLength);
    });

    it.todo('should skip back one frame when the `,` is pressed', async () => {
      const frameLength = 1 / 24;
      const startTime = 100;

      player.pause();
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => startTime);
      root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Comma' }));
      expect(spy).toHaveBeenCalledWith(startTime - frameLength);
    });

    it.todo('should not skip forward or back when `,` or `.` are pressed if not paused', async () => {
      player.play();
      const spy = vi.spyOn(player, 'currentTime').mockImplementation(() => 0);
      root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Comma' }));
      expect(spy).not.toHaveBeenCalled();
    });
  });
});