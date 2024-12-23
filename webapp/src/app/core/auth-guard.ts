import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router); // Inject the Router service
  
  if (authService.isLoggedIn) { // Check if the user is logged in
    return true; // Allow route access
  } else {
    router.navigateByUrl('/login'); // Redirect to the login page if not logged in
    return false; // Deny access to the route
  }
};
