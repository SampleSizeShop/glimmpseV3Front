import {of} from "rxjs/internal/observable/of";
import {User} from "../model/User";
import {Observable} from "rxjs/internal/Observable";
import {Token} from "../model/token";
import {AuthStrategy} from "./auth.strategy";

export class JwtAuthStrategy implements AuthStrategy<Token> {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  doLoginUser(token: Token): void {
    localStorage.setItem(this.JWT_TOKEN, token.jwt);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
