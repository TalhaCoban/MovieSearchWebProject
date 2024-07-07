import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/images.response.model';
import { Video } from 'src/app/models/videos.response.model';
import { MovieMediaService } from 'src/app/services/movies-media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @Input() movieId: number;

  images: Image[] | null = null;
  videos: Video[] | null = null;
  image_url: string = environment.image_url

  constructor(
    private movieMediaService: MovieMediaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movieMediaService.getMovieImages(this.movieId).subscribe(images => {
      this.images = images;
      // console.log("images", images);
    })
    this.movieMediaService.getMovievideos(this.movieId).subscribe(videos => {
      this.videos = videos;
      // console.log("videos", videos);
    })
  }

  getSafeUrl(key: string) {
    const videoUrl = `https://www.youtube.com/embed/${key}?si=llfpXf6fDAEayG39`;
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    return safeUrl;
  }

}
