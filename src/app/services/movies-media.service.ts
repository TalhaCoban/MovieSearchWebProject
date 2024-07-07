import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Image, ImagesResponse } from "../models/images.response.model";
import { Video, VideosResponse } from "../models/videos.response.model";


@Injectable({
    providedIn: 'root'
})
export class MovieMediaService {

    movieImages_url = environment.movieImages_url;
    movieVides_url = environment.movieVideos_url;
    api = environment.api

    headers = new HttpHeaders({
        accept: 'application/json',
        Authorization: 'Bearer ' + this.api
    })

    constructor(
        private http: HttpClient
    ) {}

    getMovieImages(movieId: number): Observable<Image[]> {
        const url: string = this.movieImages_url[0] + String(movieId) + this.movieImages_url[1];
        return this.http.get<ImagesResponse>( url, { headers: this.headers }).pipe(
            map(images => {
                const data: Image[] = [...images.backdrops]
                return data;
            })
        );
    }

    getMovievideos(movieId: number): Observable<Video[]> {
        const url: string = this.movieVides_url[0] + String(movieId) + this.movieVides_url[1];
        return this.http.get<VideosResponse>( url, { headers: this.headers }).pipe(
            map(videos => {
                let videos_data: Video[] = [];
                for (let video of videos.results) {
                    if (video.site == "YouTube") {
                        videos_data.push(video);
                    }
                }
                return videos_data;
            })
        );
    }
}
