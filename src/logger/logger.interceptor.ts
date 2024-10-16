import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly myLogger: MyLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const method = request.method;
    const path = request.path;
    const startTime = new Date().getTime();

    const originalSend = response.send;

    response.send = (responseBody: string) => {
      this.myLogger.logApi({
        path,
        method,
        request: request.body,
        response: responseBody ? JSON.parse(responseBody) : {},
        duration: new Date().getTime() - startTime + ' ms'
      });

      return originalSend.call(response, responseBody);
    };

    return next.handle();
  }
}
