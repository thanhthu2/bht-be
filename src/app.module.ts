import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './config/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    PostsModule,
    DatabaseModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required()
      })
    }),
    EndpointModule,
    StatusModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
