import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';
import VideoJsPlayer from 'video.js/dist/types/player';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target!: ElementRef;
  @Input() options!: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    controls: boolean,
    sources: {
        src: string,
        type: string,
    }[],
  };

  player!: VideoJsPlayer;

  constructor(
    private elementRef: ElementRef,
  ) {}

    // Instantiate a Video.js player OnInit
    ngOnInit() {
      this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
        console.log('onPlayerReady', this);
      });
    }

      // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
