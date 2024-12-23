import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn ) {
    if (authService.isAdmin) {
      return true; // Allow access if the user is an admin
    } else {
      router.navigateByUrl('/'); // Redirect to home if not an admin
      return false;
    }
  } else {
    router.navigateByUrl('/login'); // Redirect to login if not logged in
    return false;
  }
};
