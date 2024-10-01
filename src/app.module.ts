import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerConfigService } from './shared/config/throttler-config';
import { ThrottlerModule } from '@nestjs/throttler';
import localConfig from './shared/config/local-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './shared/config/mongoose-config';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    
  ]
})
export class AppModule { }
