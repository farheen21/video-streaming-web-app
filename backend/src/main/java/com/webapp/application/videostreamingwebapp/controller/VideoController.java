package com.webapp.application.videostreamingwebapp.controller;

import com.webapp.application.videostreamingwebapp.dto.UploadVideoResponse;
import com.webapp.application.videostreamingwebapp.dto.VideoDto;
import com.webapp.application.videostreamingwebapp.model.Video;
import com.webapp.application.videostreamingwebapp.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/video/")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file") MultipartFile file) {
        return videoService.uploadVideo(file);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("file") MultipartFile file , @RequestParam("videoId") String videoId){
        return videoService.uploadThumbnail(file , videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDto editVideoMetadata(@RequestBody VideoDto videoDto){
        return videoService.editVideo(videoDto);
    }


    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto getVideoDetails(@PathVariable String videoId) {
        return videoService.getVideoDetails(videoId);
    }

//    @PostMapping("/{vieoId}/like")
//    @ResponseStatus(HttpStatus.OK)
//    public VideoDto likedVideo(@PathVariable String videoId) {
//       return videoService.likedVideo(videoId);
//    }

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<Video> getAllVideos() {
        List<Video> allVideos = videoService.getAllVideos();
        return allVideos;
    }
}
