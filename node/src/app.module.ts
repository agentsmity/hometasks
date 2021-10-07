import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/interfaces';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<DatabaseConfig>('database').host,
        port: configService.get<DatabaseConfig>('database').port,
        username: configService.get<DatabaseConfig>('database').user,
        password: configService.get<DatabaseConfig>('database').pass,
        database: configService.get<DatabaseConfig>('database').db,
        autoLoadModels: true,
        synchronize: false,
        define: {
          timestamps: false,
        },
        omitNull: true,
      }),
    }),
  ],
})
export class AppModule {}
