import{Component}from'@angular/core';
import {ActivatedRoute }from '@angular/router';
import {VideoService}from '../video.service';

@Component({
selector: 'app-video-detail',
templateUrl: './video-detail.component.html',
styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {

videoId!: string;
videoUrl ! : string;
videoTtile !: string;
videoDesc!: string;
videoTags : Array < string> = [];

constructor(private activatedRoute: ActivatedRoute  , private videoService : VideoService){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];

    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoTtile = data.title;
      this.videoDesc = data.description;
      this.videoTags = data.tags;

      console.log(this.videoUrl , "this is videoURL from video details");
      console.log(data , "data from video detials cmp");
   })
  }
}
