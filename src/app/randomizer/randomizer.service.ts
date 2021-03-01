import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from '../constants';

@Injectable()
export class RandomizerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  /** GET number of videos from server */
  getNumVideos(): Observable<number> {
    const numVidsUrl = BASE_URL + '/api/videos/?api_key=' + this.authService.getApiKey() + '&format=jsonp&limit=1&field_list=id';
    return this.http.jsonp(numVidsUrl, 'json_callback')
      .pipe(map((data: any) => data.number_of_total_results));
  }

  /** GET a random video */
  getRandomVideo(videoCount: number): Observable<any> {
    const randOffset = Math.floor(Math.random() * videoCount);
    const randVidUrl = BASE_URL + '/api/videos/?api_key=' + this.authService.getApiKey() + '&format=jsonp&limit=1' +
      '&offset=' + randOffset + '&field_list=deck,id,image,name,publish_date,site_detail_url,video_show';
    return this.http.jsonp(randVidUrl, 'json_callback')
      .pipe(map((data: any) => {
        const results = data.results[0];
        const {
          deck,
          name,
          id,
          image
        } = results;

        return {
          deck,
          name,
          id,
          image: image.small_url,
          publishDate: results.publish_date,
          siteDetailUrl: results.site_detail_url,
          showImage: results.video_show ? results.video_show.image.tiny_url : null,
          showName: results.video_show ? results.video_show.title : null,
          showDetailUrl: results.video_show ? results.video_show.site_detail_url : null,
        };
      }));
  }
}
