import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { RandomizerService } from '../randomizer.service';
import { AuthService } from '../../auth/auth.service';

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

  constructor(private randomizerService: RandomizerService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private scrollToService: ScrollToService
  ) { }

  ngOnInit(): void {
    this.randomizerService.getNumVideos()
      .subscribe(body => { this.numVideos = body; }, err => { this.displayError(err.message); });
  }

  getRandVideo(): void {
    this.loadingCard = true;
    this.randomizerService.getRandomVideo(this.numVideos)
      .subscribe(body => {
        this.videoList.push(body);
        this.loadingCard = false;
        const config: ScrollToConfigOptions = {
          target: 'randomize-button'
        }
        this.scrollToService.scrollTo(config); 
      }, err => { this.displayError(err.message); });
  }

  displayError(msg: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(msg, '', { duration: 3000});
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
