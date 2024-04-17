import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = () : boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isAuth()){
    router.navigate(['/login'])
  };

  return authService.isAuth();
};
