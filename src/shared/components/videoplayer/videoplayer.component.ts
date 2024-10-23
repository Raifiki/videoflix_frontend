import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
    autoplay: boolean,
    controls: boolean,
    fill: boolean,
    muted: boolean,
    responsive?: boolean,
  };

  @Input() source?:{
    src: string,
    type: string,
  }

  player!: VideoJsPlayer;

  constructor(
    private elementRef: ElementRef,
  ) {}

    ngOnInit() {
      this.initPlayer();
    }
    ngOnChanges(changes: SimpleChanges) {
      if (changes['source']) {
        this.source =  changes['source'].currentValue;
        if (this.player) this.player.src([this.source]);
      }
    }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  initPlayer() {
    this.options.responsive = true;
    this.player = videojs(this.target.nativeElement, this.options);
    if (this.source?.src != '') this.player.src([this.source]);
  }
}
