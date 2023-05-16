import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient :HttpClient) { }

  uploadVideo(fileEntry : File): Observable<UploadVideoResponse> {
          const formData = new FormData()
          formData.append('file', fileEntry, fileEntry.name)
      // Http Post call to upload video
   return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/video/" , formData)
  }

  uploadThumbnail(fileEntry : File , videoId : string): Observable<string> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);
    // Http Post call to upload thumbnail
  return this.httpClient.post("http://localhost:8080/api/video/thumbnail" , formData , {
     responseType : 'text'
  })
  }

  getVideo(videoId : string):Observable<VideoDto>{
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/video/"+videoId).pipe(
      tap((response: any) => console.log(response , "this is from video-play"))
)
}

saveVideo(videoMetaData: VideoDto) : Observable<VideoDto>{
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/video/" , videoMetaData)
  }

  getAllVideo():Observable<VideoDto[]>{
    return this.httpClient.get<VideoDto[]>("http://localhost:8080/api/video/").pipe(
      tap((response: any) => console.log(response , "this is from video service for all videos"))
)
}
}
