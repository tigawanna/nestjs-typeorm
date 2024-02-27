## NestJS with TypeORM Cheatsheet

This cheatsheet provides a concise overview of key TypeORM concepts and usage within NestJS:

**Installation:**

1. **Create a NestJS project:**
   ```bash
   nest new my-project
   ```
2. **Install TypeORM and its dependencies:**
   ```bash
   cd my-project
   npm install --save typeorm @nestjs/typeorm @types/typeorm reflect-metadata
   ```

**Configuration:**

- Create a configuration file (`ormconfig.ts` or `ormconfig.json`):
   ```typescript
   // ormconfig.ts
   import { TypeOrmModuleOptions } from '@nestjs/typeorm';

   export const typeOrmConfig: TypeOrmModuleOptions = {
     type: 'mysql', // or 'postgres', 'sqlite', etc.
     host: 'your-database-host',
     port: 3306, // adjust for your database port
     username: 'your-username',
     password: 'your-password',
     database: 'your-database-name',
     entities: ['src/**/*.entity{.ts,.js}'], // path to your entity files
     synchronize: true, // set to false for production (use migrations)
   };
   ```

**Entities:**

- Define entities (models) representing database tables:
   ```typescript
   // src/user.entity.ts
   import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;
   }
   ```

**Repositories:**

- Define repositories (abstractions for interacting with entities):
   ```typescript
   // src/user.repository.ts
   import { EntityRepository, Repository } from 'typeorm';

   @EntityRepository(User)
   export class UserRepository extends Repository<User> {}
   ```

**NestJS Integration:**

- Import `TypeOrmModule` and set configuration:
   ```typescript
   // src/app.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { User } from './user.entity';
   import { UserRepository } from './user.repository';

   @Module({
     imports: [
       TypeOrmModule.forRoot(typeOrmConfig),
       TypeOrmModule.forFeature([User]), // include entities
     ],
     controllers: [AppController],
     providers: [AppService, UserRepository],
   })
   export class AppModule {}
   ```

**Service Usage:**

- Inject `UserRepository` into your service:
   ```typescript
   // src/app.service.ts
   import { Injectable } from '@nestjs/common';
   import { UserRepository } from './user.repository';

   @Injectable()
   export class AppService {
     constructor(private readonly userRepository: UserRepository) {}

     async findAllUsers(): Promise<User[]> {
       return await this.userRepository.find();
     }
   }
   ```

**Controller Usage:**

- Inject `AppService` into your controller:
   ```typescript
   // src/app.controller.ts
   import { Controller, Get } from '@nestjs/common';
   import { AppService } from './app.service';

   @Controller()
   export class AppController {
     constructor(private readonly appService: AppService) {}

     @Get('/users')
     async getAllUsers(): Promise<User[]> {
       return await this.appService.findAllUsers();
     }
   }
   ```

**Remember:**

- Replace placeholders with your actual database information.
- **Important:** Set `synchronize` to `false` in production environments and use migrations for schema changes.
- Refer to the official NestJS and TypeORM documentation for detailed information and advanced usage.
