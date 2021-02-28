import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, PROXY_URL, LOGIN_PATH, TOKEN_KEY, EXPIRES_KEY } from '../constants';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

const isAuthExpired = (expiration: string) => {
  if (!expiration) { return false; }
  const expiresMilli = Number.parseInt(expiration, 10) * 1000;

  return (expiresMilli - Date.now()) <= 0;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authKey: string;

  public redirectUrl = '';

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private http: HttpClient) {

    const expiration = this.storage.getItem(EXPIRES_KEY);
    if (isAuthExpired(expiration)) {
      this.logout();
      return;
    }

    const authKey = this.storage.getItem(TOKEN_KEY);
    this.authKey = authKey ? authKey : '';
  }

  isLoggedIn = () => {
    return this.authKey ? true : false;
  }

  login(code: string): Observable<string> {
    this.storage.setItem(TOKEN_KEY, 'logged in!');
    return this.http.get(`${PROXY_URL}${BASE_URL}${LOGIN_PATH}`, {
      params: {
        regCode: code,
        format: 'json'
      }
    })
      .pipe(map((res: any) => {
        if (res.regToken && res.expiration) {
          this.storage.setItem(TOKEN_KEY, res.regToken);
          this.storage.setItem(EXPIRES_KEY, res.expiration);
          this.authKey = res.regToken;
        }
        return res.status;
      }));
  }

  logout(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(EXPIRES_KEY);
    this.authKey = '';
  }

  getApiKey(): string {
    return this.authKey;
  }
}
