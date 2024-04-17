import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const isAuthenticated = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuth = authService.isAuth();

  if(!isAuth) router.navigate(['/login'])

  return new Observable<boolean>(subscriber => subscriber.next(isAuth))
};

export const canActivate: CanActivateFn = isAuthenticated;
export const canMatch: CanMatchFn = isAuthenticated;