import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token // Assuming you are using a Bearer token
      }
    });
    return next(clonedRequest);
  }

  return next(req); // Proceed with the original request if no token is found
};
