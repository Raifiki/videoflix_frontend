import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';

// import custom interfaces and models
import { Video } from '../../shared/definitions/models';

//import custom services
import { VideoService } from '../services/video.service';

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

    videoService = inject(VideoService);

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {  
      this.video = this.videoService.videos().filter((video: Video) => video.id == this.route.snapshot.params['id'])[0];
    }

}
