import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './modules/users';
import { PermissionsModule } from './modules/permissions';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/interfaces';
import { SuggestController } from './common/controllers/suggest.controller';
import { UsersPermissionsController } from './common/controllers/users.permissions.controller';
import { UsersPermissionsService } from './common/services/users.permissions';
import { UsersPermissions } from './common/models/users.permissions';
import { format, transports } from 'winston';
import { LoggerMiddleware } from './common/midlewares/logger';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PermissionsModule,
    SequelizeModule.forFeature([UsersPermissions]),
    WinstonModule.forRoot({
      format: format.combine(
        format.colorize({ all: true }),
        format.label({ label: '[WEB LOGGER]' }),
        format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
        format.align(),
        format.printf(
          (info) =>
            `${info.label} - ${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
      transports: [new transports.Console()],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConfig>('database'),
        autoLoadModels: true,
        synchronize: false,
        define: {
          timestamps: false,
        },
        omitNull: true,
      }),
    }),
  ],
  controllers: [SuggestController, UsersPermissionsController],
  providers: [UsersPermissionsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
