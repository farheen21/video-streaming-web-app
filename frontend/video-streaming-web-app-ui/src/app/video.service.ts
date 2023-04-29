import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  /**
   * This function uploads a video file to a server using HTTP POST request and returns an observable
   * of type UploadVideoResponse.
   * @param {File} fileEntry - A File object representing the video file that needs to be uploaded.
   * @returns an Observable of type UploadVideoResponse, which is the response from the HTTP POST call
   * to upload a video file to the specified URL.
   */
  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    // Http Post call to upload video
    return this.httpClient.post<UploadVideoResponse>(
      'http://localhost:8080/api/video/',
      formData
    );
  }

  /**
   * This function uploads a thumbnail file for a video using an HTTP POST request.
   * @param {File} fileEntry - A File object representing the thumbnail image file that needs to be
   * uploaded.
   * @param {string} videoId - The videoId parameter is a string that represents the unique identifier
   * of the video for which the thumbnail is being uploaded. It is used to associate the thumbnail with
   * the correct video.
   * @returns An Observable of type string is being returned.
   */
  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);
    // Http Post call to upload thumbnail
    return this.httpClient.post(
      'http://localhost:8080/api/video/thumbnail',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  /**
   * This function retrieves a video with a specific ID from a server using HTTP GET request and
   * returns it as an observable.
   * @param {string} videoId - a string representing the unique identifier of a video that is being
   * requested from the server. The function returns an Observable of type VideoDto, which is the data
   * transfer object representing the video. The function uses the Angular HttpClient to make an HTTP
   * GET request to the server endpoint that corresponds to the specified videoId
   * @returns The `getVideo` function returns an Observable of type `VideoDto`. It makes an HTTP GET
   * request to the URL "http://localhost:8080/api/video/" concatenated with the `videoId` parameter,
   * and logs the response to the console using the `tap` operator.
   */
  getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient
      .get<VideoDto>('http://localhost:8080/api/video/' + videoId)
      .pipe(
        tap((response: any) => console.log(response, 'this is from video-play'))
      );
  }

  /**
   * This function saves video metadata by sending a PUT request to a specified API endpoint using the
   * Angular HttpClient and returns an Observable of the saved video metadata.
   * @param {VideoDto} videoMetaData - VideoDto object that contains metadata information about the
   * video to be saved. This includes properties such as title, description, duration, and URL.
   * @returns The `saveVideo` function is returning an Observable of type `VideoDto`. It is making a
   * PUT request to the URL "http://localhost:8080/api/video/" with the `videoMetaData` object as the
   * request body. The response from the server will be of type `VideoDto`, which will be emitted by
   * the Observable.
   */
  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>(
      'http://localhost:8080/api/video/',
      videoMetaData
    );
  }
}
