import { Component } from '@angular/core';

// NATIVE
import { CapacitorHttp } from '@capacitor/core';
import { HttpHeaders, HttpOptions, HttpResponse } from '@capacitor/core/types/core-plugins';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  private readonly SERVER_URL = 'https://postman-echo.com/post';

  constructor() { }

  public async sendPostRequest(): Promise<void> {
    const body: {
      key1: string;
      key2: string;
    } = {
      key1: '11$22%33!',
      key2: 'aa$bb%cc!'
      // key1: encodeURIComponent('11$22%33!'),
      // key2: encodeURIComponent('aa$bb%cc!')
    };

    let response: HttpResponse;
    try {
      response = await this.post(
        this.SERVER_URL,
        body,
        { 'Content-Type': 'application/x-www-form-urlencoded' }
      );
    } catch (error) {
      console.error('sendPostRequest error', error);
      return;
    }

    console.info('sendPostRequest response', response);

  }

  public async post(
    url: string,
    data: { [key: string]: string | number | boolean },
    headers: HttpHeaders
  ): Promise<HttpResponse> {
    const options: HttpOptions = {
      url,
      headers,
      data
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response;
  }

}
