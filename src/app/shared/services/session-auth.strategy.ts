import {User} from "../model/User";
import {tap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {AuthStrategy} from "./auth.strategy";
import {config} from "../../config";

export class SessionAuthStrategy implements AuthStrategy<User> {

  private loggedUser: User;

  constructor(private http: HttpClient) {}

  doLoginUser(user: User): void {
    this.loggedUser = user;
  }

  doLogoutUser(): void {
    this.loggedUser = undefined;
  }

  getCurrentUser(): Observable<User> {
    console.log('hello!');
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      // return of( new User('1', '2', '3', true));
      return this.http.get<User>(`${config.authUrl}/user`)
        .pipe(tap(user => this.loggedUser = user));
    }
  }
}
