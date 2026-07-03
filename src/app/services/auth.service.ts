import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';
import { LoginResponse } from '../model/LoginResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(false);
  }

  get isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  initialize(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>('/api/user/status', { withCredentials: true }).pipe(
      map((response) => !!response?.authenticated),
      tap((authenticated) => this.isLoggedInSubject.next(authenticated)),
      catchError(() => {
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password }, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('auth.loggedIn', 'true');
        this.isLoggedInSubject.next(true);
      }),
      map(() => void 0)
    );
  }

  logout(): void {
    localStorage.removeItem('auth.loggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isLoggedInSubject.next(false);
  }
}
