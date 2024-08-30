import { Component } from '@angular/core';

// import custom components
import { VideoplayerComponent } from '../../shared/components/videoplayer/videoplayer.component';
import { Router } from '@angular/router';

// import custom interfaces and models
import { Librarycategory } from '../../shared/definitions/interfaces';
import { Video } from '../../shared/definitions/models';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    VideoplayerComponent,
    CategoryComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // move to service start
  videoLibrary: Librarycategory[] = [
    {name: 'Action',
     videos: [
      new Video({
        name: 'Video 1',
        path: 'assets/videos/example1.mp4',
        description: 'Video 1 Description',
        genre: 'Action',
        id: 'videoID1'}),
      new Video({
        name: 'Video 2',
        path: 'assets/videos/example1.mp4',
        description: 'Video 2 Description',
        genre: 'Action',
        id: 'videoID2'}),
      new Video({
        name: 'Video 3',
        path: 'assets/videos/example1.mp4',
        description: 'Video 3 Description',
        genre: 'Action',
        id: 'videoID3'}),
      ]},
    {name: 'Comedy',
      videos: [
        new Video({
          name: 'Video 1',
          path: 'assets/videos/example1.mp4',
          description: 'Video 1 Description',
          genre: 'Comedy',
          id: 'videoID4'}),
        new Video({
          name: 'Video 2',
          path: 'assets/videos/example1.mp4',
          description: 'Video 2 Description',
          genre: 'Comedy',
          id: 'videoID5'}),
        new Video({
          name: 'Video 3',
          path: 'assets/videos/example1.mp4',
          description: 'Video 3 Description',
          genre: 'Comedy',
          id: 'videoID6'}),
          new Video({
            name: 'Video 1',
            path: 'assets/videos/example1.mp4',
            description: 'Video 1 Description',
            genre: 'Comedy',
            id: 'videoID7'}),
          new Video({
            name: 'Video 2',
            path: 'assets/videos/example1.mp4',
            description: 'Video 2 Description',
            genre: 'Comedy',
            id: 'videoID8'}),
          new Video({
            name: 'Video 3',
            path: 'assets/videos/example1.mp4',
            description: 'Video 3 Description',
            genre: 'Comedy',
            id: 'videoID9'}),
            new Video({
              name: 'Video 1',
              path: 'assets/videos/example1.mp4',
              description: 'Video 1 Description',
              genre: 'Comedy',
              id: 'videoID10'}),
            new Video({
              name: 'Video 2',
              path: 'assets/videos/example1.mp4',
              description: 'Video 2 Description',
              genre: 'Comedy',
              id: 'videoID11'}),
            new Video({
              name: 'Video 3',
              path: 'assets/videos/example1.mp4',
              description: 'Video 3 Description',
              genre: 'Comedy',
              id: 'videoID12'}),
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
