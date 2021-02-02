import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() video: any;
  title = 'The Giant Beastcast: Episode 295'
  id = 16509;
  publishDate = '2021-01-14 13:00:00'
  videoImageUrl = 'https://giantbomb1.cbsistatic.com/uploads/scale_small/0/31/3266408-vf_thegiantbeastcast_01142021.jpg';
  linkUrl = 'https://www.giantbomb.com/videos/episode-295/2300-16509/';
  showImageUrl = 'https://giantbomb1.cbsistatic.com/uploads/square_mini/27/272636/3061712-giant%20beastcast.png';
  showUrl = 'https://www.giantbomb.com/shows/beastcast/';
  deck = 'As we near our Game of the Year talks we\'ve got some more thoughts on games like Ghost of Tsushima, 13 Sentinels, and Assassin\'s Creed Valhalla. We\'ve also got our CES news with Jeff Bakalar, more movie talk, and emails!';


  constructor() { }

  ngOnInit(): void {
  }

}
