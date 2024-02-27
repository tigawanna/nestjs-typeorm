## NESTJS cheatsheet

**Installation:**

1. **Create a NestJS project:**
   ```bash
   nest new cachet-app
   ```
2. **Install Cachet and its dependencies:**
   ```bash
   cd cachet-app
   npm install --save @nestjs/common @nestjs/core @nestjs/platform-express cachet express cache
   ```

**Cachet Configuration:**

1. **Create a configuration file (e.g., `cachet.config.ts`):**
   ```typescript
   import { CachetModule } from 'nestjs-cachet';

   export const cachetConfig = {
     host: 'your-cachet-host', // Replace with your Cachet instance's host
     port: 12345, // Replace with your Cachet instance's port if different from the default (4280)
     apiToken: 'your-api-token', // Replace with your Cachet API token
     ssl: true, // Set to true if your Cachet instance uses SSL
   };

   export const CachetModuleFactory = CachetModule.forRootAsync({
     useFactory: async () => cachetConfig,
   });
   ```

2. **Import and use the configuration in your main NestJS module (e.g., `app.module.ts`):**
   ```typescript
   import { Module } from '@nestjs/common';
   import { CachetModuleFactory } from './cachet.config';

   @Module({
     imports: [CachetModuleFactory],
   })
   export class AppModule {}
   ```

**Creating a NestJS Service:**

1. **Generate a service:**
   ```bash
   nest generate service cachet
   ```
2. **Inject the `CachetService` and use its methods in your service (e.g., `cachet.service.ts`):**
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { CachetService } from 'nestjs-cachet';

   @Injectable()
   export class CachetService {
     constructor(private readonly cachetClient: CachetService) {}

     // Example method to get all components:
     async getAllComponents(): Promise<any[]> {
       try {
         const components = await this.cachetClient.components.index();
         return components.data;
       } catch (error) {
         console.error('Error fetching components:', error);
         throw error;
       }
     }

     // Add more methods for other Cachet API interactions as needed
   }
   ```

**Using the Service:**

1. **Inject the `CachetService` into your controllers or other services:**
   ```typescript
   import { Controller, Get } from '@nestjs/common';
   import { CachetService } from './cachet.service';

   @Controller('cachet')
   export class CachetController {
     constructor(private readonly cachetService: CachetService) {}

     @Get('/components')
     async getAllComponents(): Promise<any[]> {
       return await this.cachetService.getAllComponents();
     }

     // Add more controller methods as needed
   }
   ```

**Running the Application:**

1. **Start the development server:**
   ```bash
   npm run start:dev
   ```
2. **Access your NestJS application at `http://localhost:3000` (or the port you specified).**

**Additional Notes:**

- Refer to the NestJS documentation ([https://docs.nestjs.com/](https://docs.nestjs.com/)) and Cachet API documentation ([https://docs.cachethq.io/](https://docs.cachethq.io/)) for more details on specific API calls and methods.
- Consider implementing error handling and proper logging in your service and controllers for robust production use.
- Remember to replace placeholders like `your-cachet-host`, `your-api-token`, etc. with your actual values.
