import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { Context } from 'vm';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: `schema.gql`,
      driver: ApolloDriver,
      playground: true,
      introspection:true
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/book.db',
      logging:true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 