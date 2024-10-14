import { Global, Module } from '@nestjs/common';
import { MyLogger } from './logger.service';
import { LoggingInterceptor } from './logger.interceptor';

@Global()
@Module({
  providers: [MyLogger, LoggingInterceptor],
  exports: [MyLogger, LoggingInterceptor]
})
export class LoggerModule {}
