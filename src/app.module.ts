import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerConfigService } from './shared/config/throttler-config';
import { ThrottlerModule } from '@nestjs/throttler';
import localConfig from './shared/config/local-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './shared/config/mongoose-config';
import { UserModule } from './modules/user/presentation/modules/user.module';
import { TodoListModule } from './modules/todo-list/presentation/modules/todo-list.module';
import { TodoItemModule } from './modules/todo-item/presentation/modules/todo-item.module';

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
    AppModule,
    UserModule,
    TodoListModule,
    TodoItemModule
  ]
})
export class AppModule { }
