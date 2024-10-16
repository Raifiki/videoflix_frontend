import { Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';
import { CategoryComponent } from './category/category.component';

// import custom interfaces and models
import { Librarycategory } from '../../shared/definitions/interfaces';
import { Video } from '../../shared/definitions/models';

// import custom services
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    VideoplayerComponent,
    CategoryComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  videoLibrary: Librarycategory[] = [];
  videoService = inject(VideoService);

  previewVideo: Signal <Video> = signal(new Video());

  constructor(private router: Router) {
    effect(() => {
      this.generateVideoLib();
      //this.updatePreviewVideo(this.getRandomVideo());
    });
    this.previewVideo = computed(() => this.videoService.selectedVideo());
  }
  
  ngOnInit(): void {
    if(this.videoService.videos().length == 0) this.videoService.getVideos();
  }
  logout(){
    this.logoutUser();
    this.router.navigate(['/Login']);
  }


  logoutUser(){
    localStorage.removeItem('credentials');
  }

  generateVideoLib(){
    this.videoLibrary = [];
    this.videoService.genres().forEach((genre: string) => {
      let genreVideos = this.videoService.videos().filter((video: Video) => video.genre === genre);
      this.videoLibrary.push({name: genre, videos: genreVideos});
    })
  }

  getRandomVideo(){
    if(this.videoService.videos().length === 0)
      return new Video()
    let video = this.videoService.videos()[Math.floor(Math.random() * this.videoService.videos().length)];
    return video
  }

  updatePreviewVideo(video: Video){
    //this.previewVideo = video;  
  }


}
