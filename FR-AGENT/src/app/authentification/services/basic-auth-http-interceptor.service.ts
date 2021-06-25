import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { InterceptorSkip } from 'src/app/shared/services/currency-conversion.service';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers && req.headers.has(InterceptorSkip)) {
      const headers = req.headers.delete(InterceptorSkip);
      return next.handle(req.clone({ headers }));
    }

    if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('basicauth')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('basicauth'),
        },
      });
    }

    return next.handle(req);
  }
}
