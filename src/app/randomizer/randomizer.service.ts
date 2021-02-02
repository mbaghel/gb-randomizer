import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  private apiKey = ''

  constructor(private http: HttpClient) { }

  /** GET number of videos from server */
  getNumVideos(): Observable<number> {
    const numVidsUrl = 'https://giantbomb.com/api/videos/?api_key=' + this.apiKey + '&format=jsonp&limit=1&field_list=id'
    return this.http.jsonp(numVidsUrl, 'json_callback')
      .pipe(map(data => data["number_of_total_results"]))
  }

  /** GET a random video */
  getRandomVideo(videoCount: number) {
    const randOffset = Math.floor(Math.random() * videoCount);
    const randVidUrl = 'https://giantbomb.com/api/videos/?api_key=' + this.apiKey + '&format=jsonp&limit=1' +
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
          image: image['small_url'],
          publishDate: results['publish_date'],
          siteDetailUrl: results['site_detail_url'],
          showImage: results['video_show'] ? results['video_show']['image']['tiny_url'] : null,
          showName: results['video_show'] ? results['video_show']['title'] : null,
          showDetailUrl: results['video_show'] ? results['video_show']['site_detail_url'] : null,
        }
      }))
  }
}
