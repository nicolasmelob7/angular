import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { DialogMessageService } from '@src/app/shared/components/dialog-message/service/dialog-message.service';
import { LoadingService } from '@src/app/shared/components/loading/service/loading.service';
import { catchError, finalize, Observable, throwError } from 'rxjs';

export function HttpErrorInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  const dialogMessageService = inject(DialogMessageService);

  return next(req).pipe(
    catchError((error) => {
      dialogMessageService.open(error.status, error.message);
      return throwError(() => error);
    }),
  );
}
