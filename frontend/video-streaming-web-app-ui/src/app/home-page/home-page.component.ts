import{Component}from'@angular/core';
import {VideoService }from '../video.service';
import {VideoDto}from '../video-dto';
import {Router}from '@angular/router';

@Component({
selector: 'app-home-page',
templateUrl: './home-page.component.html',
styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
videos: VideoDto[] = [];


constructor( private videoService : VideoService , private router: Router){
    this.videoService.getAllVideo().subscribe(
      data => {
        this.videos = data
        console.log(data , "hey called for new video all method for home page");
      },
      error => {
        console.error(error);
      }
    );
  }

  editVideo(videoId: string){
    this.router.navigate(['/save-video-details', videoId]);
  }
}
