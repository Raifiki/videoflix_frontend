import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// import custom interfaces and models
import { Video } from '../../shared/definitions/models';

// import environment variables
import { ENVIRONEMENT } from '../../environment/environment';

// import custom services
import { UserService } from './user.service';
import log from 'video.js/dist/types/utils/log';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videos: WritableSignal<Video[]> = signal([]);
  genres: WritableSignal<string[]> = signal([]);

  userService = inject(UserService)

  backendUrl = ENVIRONEMENT.backendUrl

  constructor(private http: HttpClient) {}

  getVideoDatafromServer(token:string) {
    let url = this.backendUrl + '/video/';
    let headers = new HttpHeaders({ 'Authorization': 'Token ' +  token});
    return lastValueFrom(this.http.get(url,{headers: headers}));
  }

  getGenresDatafromServer(token:string) {
    let url = this.backendUrl + '/genre/';
    let headers = new HttpHeaders({ 'Authorization': 'Token ' +  token});
    return lastValueFrom(this.http.get(url,{headers: headers}));
  }

  getVideos() {
      let token: string|undefined = this.userService.activeUser()?.token;
      if (token) {
        this.getVideoDatafromServer(token).then((data: any) => this.generateVideoList(data));
        this.getGenresDatafromServer(token).then((data: any) => this.generateGenresList(data));
      }
      
    }

  getProperVideoObject(obj: any) {
    return new Video({
      name : obj.title,
      path : obj.video,
      description : obj.description,
      genre : this.getVideoGenreFromBEData(obj.genre),
      id : obj.id,
      thumbnail : obj.thumbnail,
    })
  }

  generateVideoList(BEdata:any) {
    let videos: Video[] = []
    BEdata.forEach((videoBEdata: any) => {
      videos.push(new Video(this.getProperVideoObject(videoBEdata)));
    })
    this.videos.set(videos);
  }

  generateGenresList(BEdata:any) {
    let genres: string[] = []
    BEdata.forEach((genreBEdata: any) => {
      genres.push(genreBEdata.name);
    })
    this.genres.set(genres);
  }

  getVideoGenreFromBEData(genre: any) {
    return (genre != null)? genre.name : undefined
  }
  
}
