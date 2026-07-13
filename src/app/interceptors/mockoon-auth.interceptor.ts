import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockoonAuthInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.isMockoonRequest(request.url) && !request.headers.has('Authorization')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer jwt',
        },
      });
    }

    return next.handle(request);
  }

  private isMockoonRequest(url: string): boolean {
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;

    return normalizedUrl.startsWith('/api/')
      && !normalizedUrl.startsWith('/api/auth/')
      && !normalizedUrl.startsWith('/api/rentals')
      && !normalizedUrl.startsWith('/api/user/')
      && !normalizedUrl.startsWith('/api/uploads/');
  }
}
