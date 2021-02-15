import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { APP_NAME } from '../../constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  appName = APP_NAME;
  doneMsg = 'Go back to enter link code';
  loading = false;

  codeForm = this.fb.group({
    code: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { code } = this.codeForm.value;
    if (!code.length) return;
    this.doneMsg = 'Linking account...';
    this.loading = true;
    this.authService.login(code)
      .subscribe(msg => {
        this.loading = false;

        if (msg !== 'success') {
          throw new Error(msg);
        }

        if (this.authService.isLoggedIn()) {
          const redirectUrl = this.authService.redirectUrl;
          this.router.navigate([redirectUrl])
        }
      }, err => {
        this.doneMsg = 'Failed to link! Please go back'
        this.snackBar.open(err.message, '', { duration: 3000 });
      })
      
  }
}
