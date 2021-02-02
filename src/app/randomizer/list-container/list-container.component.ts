import { Component, OnInit } from '@angular/core';

import { RandomizerService } from '../randomizer.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  providers: [RandomizerService],
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

  numVideos: number;
  videoList = [];
  loadingCard = false;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit(): void {
    this.randomizerService.getNumVideos()
      .subscribe(body => {this.numVideos = body});
  }

  getRandVideo(): void {
    this.loadingCard = true;
    this.randomizerService.getRandomVideo(this.numVideos)
      .subscribe(body => {
        this.videoList.push(body)
        this.loadingCard = false;
      });
  }
}
