import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  private static baseUrl = 'https://nodeauthweb.azurewebsites.net/auth';

  protected errorLog(err: string) {
    console.error(err);
  }

  public async login(username: string, password: string) {
    try {
      const params = {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: 'angular',
        client_secret: 'angular'
      };
      const searchParams = Object.keys(params).map((key:string) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
      const result = await fetch(`${AuthService.baseUrl}/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: searchParams
      });
      const data = await result.json();
      if (!data) { throw new Error('Response is not valid'); }
      return data.access_token;
    } catch (err) {
      throw err;
    }
  }
}
