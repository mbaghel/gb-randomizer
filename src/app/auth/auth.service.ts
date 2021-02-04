import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL, PROXY_URL, LOGIN_PATH, TOKEN_KEY } from '../constants';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.storage.getItem(TOKEN_KEY) ? true : false;
  }

  login(code: string) {
    this.storage.setItem(TOKEN_KEY, 'logged in!');
    return this.http.get(`${PROXY_URL}${BASE_URL}${LOGIN_PATH}`, {
      params: {
        regCode: code,
        format: 'json'
      }
    }) 
  }

  logout() {
    this.storage.removeItem(TOKEN_KEY);
  }
}
