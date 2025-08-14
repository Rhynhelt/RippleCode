# Task Manager — Angular + ASP.NET Core
A full‑stack CRUD Task Management System with filtering, sorting, pagination, validation, error handling, Swagger docs, and Dockerized. 
Frontend: http://localhost:4200
Backend: http://localhost:5000
SQL: localhost,1433 (sa/Your_password123)

## Tech
- Frontend: Angular, Angular Material, RxJS
- Backend: ASP.NET Core 8 Web API, EF Core, SQL Server
- Docs: Swagger/OpenAPI
- Deploy: Docker & docker-compose

Notes:
Server-side filtering/sorting/pagination to support large datasets.
Enums serialized as strings for readability.
Basic global error middleware returns Problem Details.
Offline banner uses navigator.onLine; requests aren’t queued offline.
Unit test service methods (API and Angular)
E2E tests for create/edit/delete flows

## Initial Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
      Direct your attention towards "Backend Database Setup" and "Frontend Setup" below
4. Navigate to `http://localhost:4200` in your browser

## Prerequisites
- Node.js (v16 or later)
- Angular CLI (v17 or later)
- npm (v8 or later)

## Backend Database & Migration Setup:
```
bash
cd backend
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run ```

## Frontend Setup:
Not much different here really. Enter the root folder and start Angular via: ng serve

## API Documentation:
To view the entire API, simply go to http://localhost:5000/swagger and you'll be able to see all the potential details you'd need, including request testing.

## Environment
Configure backend/appsettings.json or ConnectionStrings__DefaultConnection env var.

## Project Structure
Those not listed but present in the repo derive primarily from docker.
```
repo/
├─ README.md
├─ angular.json
├─ package-lock.json
├─ package.json
├─ server.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.spec.json
├─ .angular
│  ├─ libraries and all that that implies...
├─ backend/
│  ├─ TaskApi.csproj
│  ├─ Program.cs
│  ├─ appsettings.json
│  ├─ Controllers/
│  │  └─ TasksController.cs
│  ├─ Data/
│  │  ├─ AppDbContext.cs
│  │  └─ AppDbContextFactory.cs
│  ├─ Dtos/
│  │  ├─ TaskDtos.cs
│  │  └─ Paging.cs
│  ├─ Middleware/
│  │  ├─ ExceptionMiddleware.cs
│  │  └─ README.md
│  ├─ Models/
│  │  └─ TaskItem.cs
│  ├─ Services/
│  │  └─ QueryExtensions.cs
│  ├─ TaskApi/ (generated)
│  ├─ obj/ (generated)
│  ├─ bin/ (generated)
│  └─ Migrations/ (generated)
├─ public/
│  └─ favicon.io
├─ environments/
│  └─ environment.ts
└─ src/
   ├─ index.html
   ├─ main.server.ts
   ├─ main.ts
   ├─ styles.scss
   └─ app/
      ├─ components/
      │  └─ layout/
      │     ├─ layout.component.html
      │     ├─ layout.component.scss
      │     ├─ layout.component.spec.ts
      │     └─ layout.component.ts
      ├─ features
      │  └─ tasks/
      │     ├─ task.model.ts
      │     ├─ task.module.ts
      │     ├─ task-routing.module.ts
      │     └─ pages
      │        ├─ task-list/
      │        │  ├─ task-list.component.ts
      │        │  ├─ task-list.component.html
      │        │  ├─ task-list.component.spec.ts
      │        │  └─ task-list.component.scss
      │        ├─ task-detail/
      │        │  ├─ task-detail.component.ts
      │        │  ├─ task-detail.component.html
      │        │  ├─ task-detail.component.spec.ts
      │        │  └─ task-detail.component.scss
      │        └─ task-form/
      │           ├─ task-form.component.ts
      │           ├─ task-form.component.html
      │           ├─ task-form.component.spec.ts
      │           └─ task-form.component.scss
      ├─ models/
      │  └─ task.model.ts
      ├─ services/
      │  ├─ interceptors/
      │  │  ├─ error.interceptor.ts
      │  │  └─ loading.interceptor.ts
      │  ├─ api-base-url.token.ts
      │  ├─ enum-normalizer.interceptor.ts
      │  ├─ loading.service.ts
      │  └─ task.service.ts
      ├─ app.component.html
      ├─ app.component.scss
      ├─ app.component.spec.ts
      ├─ app.component.ts
      ├─ app.config.server.ts
      ├─ app.config.ts
      └─ app.routes.ts
      ```


## Database Schema
Table: Tasks

Id (int, PK, identity)

Title (nvarchar(120), required)

Description (nvarchar(max))

DueDate (datetime2, nullable)

Priority (nvarchar(24))

Status (nvarchar(24))

CreatedAt (datetime2)

UpdatedAt (datetime2)


## Completed Development Tasks
Completed Tasks: 1 - 2 - 3 - 4 - 5 - 6* - 7 - 8** - 9 - 10
* Some of the unique SQL queries I never got around to making. However, I did achieve similar or identical functions through other methods.
** Incorrect dates or backend fault will respond with a popup for the user as well as confirmation prior to deletion.

Below is were the standard statements that specified what was expected at a minimum and I'll include them here since they were covered in the project.

1. Create the following components in the tasks feature:
   - Task List View
   - Task Detail View
   - Task Form (Create/Edit)

2. Implement the task service to communicate with the API

3. Add form validation and error handling

4. Implement sorting and filtering in the task list
