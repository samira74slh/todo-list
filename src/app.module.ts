import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerConfigService } from './shared/config/throttler-config';
import { ThrottlerModule } from '@nestjs/throttler';
import localConfig from './shared/config/local-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [localConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
