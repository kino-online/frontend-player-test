import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounce, debounceTime, fromEvent, mergeWith, throttleTime } from 'rxjs';
import { environment } from 'src/environment/environment';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

export type VideoDisplayData = {
  sources: {
    src: string,
    type: string,
  }[];
  posterUrl?: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: [
    './player.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @Input() video!: VideoDisplayData;
  @Input() autoplay = false;

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  player?: Player;
  socket: WebSocket;

  constructor(private zone: NgZone) {
    this.socket = new WebSocket(environment.WEBSOCKET_URL as string);
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.player = videojs(this.videoElement.nativeElement, {
        autoplay: this.autoplay,
        controls: true,
        height: visualViewport?.height,
        width: visualViewport?.width,
        sources: this.video.sources,
        poster: this.video.posterUrl,
      });

      const timeUpdate$ = fromEvent(this.player, 'timeupdate')
        .pipe(throttleTime(2000));
      const paused$ = fromEvent(this.player, 'paused');

      timeUpdate$.pipe(mergeWith(paused$))
        .subscribe(() => {
          this.sendPlayerTime();
        });
    });
  }

  private sendPlayerTime() {
    this.socket.send(JSON.stringify({
      time: this.player?.currentTime(),
    }));
  }

  @HostListener('keyup.space')
  togglePlay() {
    if (!this.player) return;

    if (this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
