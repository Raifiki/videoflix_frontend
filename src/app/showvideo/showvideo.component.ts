import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';

// import custom interfaces and models
import { Video } from '../../shared/definitions/models';

@Component({
  selector: 'app-showvideo',
  standalone: true,
  imports: [
    VideoplayerComponent,
    RouterModule
  ],
  templateUrl: './showvideo.component.html',
  styleUrl: './showvideo.component.scss'
})
export class ShowvideoComponent {
  video: Video = new Video({
    name: 'Video 3',
    path: 'assets/videos/example1.mp4',
    description: 'Video 3 Description',
    genre: 'Comedy',
    id: 'videoID12'});
}
