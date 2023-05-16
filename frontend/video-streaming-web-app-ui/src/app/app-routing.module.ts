import{Component, NgModule}from '@angular/core';
import {RouterModule, Routes}from '@angular/router';
import {SaveVideoDetailsComponent} from './save-video-details/save-video-details.component';
import {UploadVideoComponent}from './upload-video/upload-video.component';
import { VideoDetailComponent}from './video-detail/video-detail.component';
import {ProfilePageComponent}from './profile-page/profile-page.component';
import {HomePageComponent}from './home-page/home-page.component';

const routes: Routes = [
{path: '' ,  component: HomePageComponent},
{path: 'upload-video' ,  component: UploadVideoComponent},
{path: 'save-video-details/:videoId' ,  component: SaveVideoDetailsComponent},
{path: 'video-details/:videoId' ,  component: VideoDetailComponent},
{path: 'profile', component: ProfilePageComponent},

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
