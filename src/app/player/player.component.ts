import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class PlayerComponent implements AfterViewInit {
  @Input() video!: VideoDisplayData;
  @Input() autoplay = false;

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  player?: Player;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    console.log(this.videoElement.nativeElement);
    this.zone.runOutsideAngular(() => {
      this.player = videojs(this.videoElement.nativeElement, {
        autoplay: this.autoplay,
        controls: true,
        height: visualViewport?.height,
        width: visualViewport?.width,
        sources: this.video.sources,
        poster: this.video.posterUrl,
      });
    });
    this.player?.currentTime(100);
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
