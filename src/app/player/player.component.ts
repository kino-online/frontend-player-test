import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, fromEvent, map, mergeWith, throttleTime } from 'rxjs';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { PlayerStatsService } from '../player-stats.service';

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
  

  constructor(
    private zone: NgZone,
    private playerStatsService: PlayerStatsService,
  ) {
  }

  ngOnDestroy(): void {
    this.playerStatsService.close();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (typeof visualViewport === undefined || !window.visualViewport) return;
      
      this.player = videojs(this.videoElement.nativeElement, {
        autoplay: this.autoplay,
        controls: true,
        height: window.visualViewport.height,
        width: window.visualViewport.width,
        sources: this.video.sources,
        poster: this.video.posterUrl,
      });

      const timeUpdate$ = fromEvent(this.player, 'timeupdate')
        .pipe(throttleTime(2000));
      const paused$ = fromEvent(this.player, 'paused');

      timeUpdate$.pipe(
        mergeWith(paused$),
        map(() => this.player?.currentTime()),
        filter(Boolean)
      )
        .subscribe(this.playerStatsService.progressPipe$);
    });
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
