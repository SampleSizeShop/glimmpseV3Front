import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MathJaxService {
  constructor(private http: Http) {
  }

  public getMessage() {
    return 'Flask service';
  }

  public getTexFromFlask(): Promise<String> {
    return this.http.post('http://127.0.0.1:5000/api/storedtex', '', this.jsonHeader())
      .toPromise().then(response => response.json().texString as String)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private jsonHeader(): RequestOptions {
    const header = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: header});
    return options;
  }
}
