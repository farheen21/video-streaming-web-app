import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDto } from '../video-dto';


@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.scss']
})
export class SaveVideoDetailsComponent {
   
  saveVideoDetailsForm : FormGroup;
  title : FormControl =  new FormControl('');
  description : FormControl =  new FormControl('');
  videoStatus : FormControl =  new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags :string[] = [];
  selectedFile !: File ;
  selectedFileName = '';
  videoId = '';
  fileSelected : boolean = false;
  videoUrl!: string; 
  thumbnailUrl !: string ;
  

  /**
   * This is a constructor function that initializes variables and a form group, and retrieves video
   * data from a service using the video ID from the activated route.
   * @param {ActivatedRoute} activatedRoute - An instance of the ActivatedRoute class, which is used to
   * retrieve information about the current activated route.
   * @param {VideoService} videoService - It is a service that provides methods to interact with the
   * backend API to retrieve and manipulate video data.
   * @param {MatSnackBar} snackBar - The `snackBar` parameter is an instance of the `MatSnackBar`
   * service provided by Angular Material. It is used to display snack bar messages to the user, such
   * as success or error messages.
   */
  constructor (private activatedRoute : ActivatedRoute , 
               private videoService : VideoService , 
               private snackBar : MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId']; 
    //  this.videoUrl = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
    this.videoService.getVideo(this.videoId).subscribe(data => {
       this.videoUrl = data.videoUrl;
       console.log(this.videoUrl , "this is videoURL from parent");
       this.thumbnailUrl = data.thumbnailUrl;
       console.log(data , "data from parent");
    })
    this.saveVideoDetailsForm = new FormGroup({
       title : this.title,
       description : this.description , 
       videoStatus : this.videoStatus
    })
  }
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new tags
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value : string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(value : string , event: MatChipEditedEvent) {
    const NewValue = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!NewValue) {
      this.remove(value);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags[index] = NewValue;
    }
  }

  /**
   * This function sets the selected file and its name when a file is selected by the user.
   * @param {Event}  -  is an event object that is passed as a parameter to the
   * onFileSelected() function. It contains information about the event that triggered the function,
   * such as the target element and any associated data. In this case, it is an Event object that is
   * triggered when a file is selected using an
   */
  onFileSelected($event: Event){
    // @ts-ignore
    this.selectedFile = event?.target.files[0];
    this.selectedFileName= this.selectedFile.name;
    this.fileSelected  = true;
  }

  /**
   * The function uploads a thumbnail for a video and displays a notification upon successful upload.
   */
  onUpload(){
     this.videoService.uploadThumbnail(this.selectedFile , this.videoId).subscribe(data => {
      //  console.log(data);
       // show an upload notification
       this.snackBar.open("Thumbnail successfully added" , "OK");
     })
  }

  /**
   * This function saves video metadata by making a HTTP call to the backend using the video service.
   */
  saveVideo() {
    // call the video service to make a http call to our backend
    const videoMetaData : VideoDto = {
      "id" : this.videoId, 
      "title" : this.saveVideoDetailsForm.get('title')?.value , 
      "description" : this.saveVideoDetailsForm.get('description')?.value,
      "videoStatus" : this.saveVideoDetailsForm.get('videoStatus')?.value,
      "tags" : this.tags,
      "videoUrl" : this.videoUrl,
      "thumbnailUrl" : this.thumbnailUrl ,
    }

    this.videoService.saveVideo(videoMetaData).subscribe( data=> {
       this.snackBar.open("Video Metada Uploaded Successfully" , "Ok");
       console.log(data , "coming from saveVideo Method")
    })
  }
} 