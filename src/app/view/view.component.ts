import { Component } from '@angular/core';
import { PlayerComponent, VideoDisplayData } from '../player/player.component';
import { CommonModule } from '@angular/common';

export type VideoInfo = {
  title: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [CommonModule, PlayerComponent],
})
export class ViewComponent {
  testVideo: VideoDisplayData = {
    sources: [
      {
        src: 'https://storage.yandexcloud.net/test-split-files/master.m3u8',
        type: 'application/x-mpegURL',
      }
    ],
  };

  videoInfo: VideoInfo = {
    title: 'wtf am i watchin',
  };
}
