import {Observable} from "rxjs/internal/Observable";
import {User} from "../model/User";
import {InjectionToken} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SessionAuthStrategy} from "./session-auth.strategy";
import {JwtAuthStrategy} from "./jwt-auth.strategy";
import {config} from "../../config";

export interface AuthStrategy<T> {

  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User>;

}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>('AuthStrategy');

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
    switch (config.auth) {
      case 'session':
        return new SessionAuthStrategy(http);
      case 'token':
        return new JwtAuthStrategy();
    }
  }
};
