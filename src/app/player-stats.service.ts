import { Injectable } from '@angular/core';
import { NextObserver } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  socket: WebSocket;

  progressPipe$: NextObserver<number> = {
    next: (currentTime: number) => {
      if (!this.isOpen) return;

      this.socket.send(JSON.stringify({
        t: currentTime,
      }));
    },
  };

  private get isOpen() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  private get canClose() {
    return ([WebSocket.CLOSED, WebSocket.CLOSING] as number[]).includes(this.socket.readyState);
  }

  constructor() {
    this.socket = new WebSocket(environment.WEBSOCKET_URL as string);
  }

  sendProgress(currentTime: number) {
    if (!this.isOpen) return;

    this.socket.send(JSON.stringify({
      t: currentTime,
    }));
  }

  close() {
    if (this.canClose) return;

    this.socket.close();
  }
}