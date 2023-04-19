import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent {
  
  @Input()
  videoUrl!: string | '';
  
  // constructor() {
  //   console.log(this.videoUrl , "checking in child cmp");
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.videoUrl, "checking in child cmp");
  }
}
