import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { BadgesModule } from './badges/badges.module';
import { PostsModule } from './posts/posts.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
          dialect: 'postgres',
          autoLoadModels: true,
          synchronize: false    // don't modify the DB schema
        }
      }
    }),
    BadgesModule,
    PostsModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
