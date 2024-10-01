import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';

// import custom interfaces and models
import { Video } from '../../shared/definitions/models';

//import custom services
import { VideoService } from '../services/video.service';
import log from 'video.js/dist/types/utils/log';

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
    video: Video = new Video();

    videoService = inject(VideoService);

    videoSource:string = '';

    resoultionSelector = false;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
      if (this.videoService.videos().length == 0){
        this.router.navigate(['/Dashboard'])}
      else{
        this.video = this.videoService.videos().filter((video: Video) => video.id == this.route.snapshot.params['id'])[0];
        this.setVideoSrc();
      };
    }

    setVideoSrc(dpi?: '480'| '720' |'1080') {
      let src_path = (dpi)? this.video.path.split('.mp4')[0] + '_' + dpi + 'p.mp4': this.video.path;
      this.videoSource = src_path;
      this.closeResolutionSelector();
    }

    closeResolutionSelector() {
      this.resoultionSelector = false;
    }

    showResoultionSelector(event: Event) {
      event.stopPropagation();
      setTimeout(() => {this.closeResolutionSelector();}, 5000);
      this.resoultionSelector = true;
    }
}
