import { Component } from '@angular/core';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';
import { Router } from '@angular/router';

// import custom interfaces and models
import { Videogenre } from '../../shared/definitions/interfaces';
import { Video } from '../../shared/definitions/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VideoplayerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // move to service start
  videoLibrary: Videogenre[] = [
    {name: 'Action',
     videos: [
      new Video({
        name: 'Video 1',
        path: 'assets/videos/example1.mp4',
        description: 'Video 1 Description',
        genre: 'Action'}),
      new Video({
        name: 'Video 2',
        path: 'assets/videos/example1.mp4',
        description: 'Video 2 Description',
        genre: 'Action'}),
      new Video({
        name: 'Video 3',
        path: 'assets/videos/example1.mp4',
        description: 'Video 3 Description',
        genre: 'Action'}),
      ]},
    {name: 'Comedy',
      videos: [
        new Video({
          name: 'Video 1',
          path: 'assets/videos/example1.mp4',
          description: 'Video 1 Description',
          genre: 'Comedy'}),
        new Video({
          name: 'Video 2',
          path: 'assets/videos/example1.mp4',
          description: 'Video 2 Description',
          genre: 'Comedy'}),
        new Video({
          name: 'Video 3',
          path: 'assets/videos/example1.mp4',
          description: 'Video 3 Description',
          genre: 'Comedy'}),
          new Video({
            name: 'Video 1',
            path: 'assets/videos/example1.mp4',
            description: 'Video 1 Description',
            genre: 'Comedy'}),
          new Video({
            name: 'Video 2',
            path: 'assets/videos/example1.mp4',
            description: 'Video 2 Description',
            genre: 'Comedy'}),
          new Video({
            name: 'Video 3',
            path: 'assets/videos/example1.mp4',
            description: 'Video 3 Description',
            genre: 'Comedy'}),
            new Video({
              name: 'Video 1',
              path: 'assets/videos/example1.mp4',
              description: 'Video 1 Description',
              genre: 'Comedy'}),
            new Video({
              name: 'Video 2',
              path: 'assets/videos/example1.mp4',
              description: 'Video 2 Description',
              genre: 'Comedy'}),
            new Video({
              name: 'Video 3',
              path: 'assets/videos/example1.mp4',
              description: 'Video 3 Description',
              genre: 'Comedy'}),
        ]}
  ];

  // move to service end

  constructor(private router: Router) {}
  logout(){
    // ToDo: Logout User
    this.router.navigate(['/Login']);
  }

  startVideo(){
    // ToDo: Start Video in video Player
  }
}
