import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";
import {catchError, map, tap} from "rxjs/operators";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {AUTH_STRATEGY, AuthStrategy} from "./auth.strategy";
import {LoginRequest} from "../model/login-request";
import {config} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';
  public readonly INITIAL_PATH = '/app/dashboard';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/signup`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/confirm?`, {email, code});
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${config.authUrl}/login`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config.authUrl}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User> {
    return this.auth.getCurrentUser();
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }

}
