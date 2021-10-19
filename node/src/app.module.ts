import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users';
import { PermissionsModule } from './modules/permissions';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/interfaces';
import { SuggestController } from './controllers/suggest.controller';
import { UsersPermissionsController } from './controllers/users.permissions.controller';
import { UsersPermissionsService } from './services/users.permissions';
import { UsersPermissions } from './models/users.permissions';

@Module({
  imports: [
    UsersModule,
    PermissionsModule,
    SequelizeModule.forFeature([UsersPermissions]),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
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
export class AppModule {}
