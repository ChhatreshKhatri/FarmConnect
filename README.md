# FarmConnect Web API

FarmConnect is a comprehensive livestock management platform that simplifies farm operations for owners and suppliers. This REST API backend provides secure, role-based access to manage livestock health, medicine and feed inventory, resource requests, and feedback systems.

## 🚀 Features

### 🔐 Authentication & Authorization

- JWT-based authentication with secure token management
- Role-based access control (Owner/Supplier roles)
- ASP.NET Core Identity integration
- Protected API endpoints

### 📋 Core Functionality

- **Livestock Management**: Track and manage livestock records (Owner role)
- **Medicine Management**: Create, edit, and manage medicine inventory (Supplier role)
- **Feed Management**: Handle feed products and inventory tracking (Supplier role)
- **Request System**: Submit and manage resource requests between roles
- **Feedback System**: Customer feedback and supplier response management

## 🛠️ Tech Stack

- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server 2022 / Azure SQL Database
- **ORM**: Entity Framework Core 8.0
- **Authentication**: ASP.NET Core Identity + JWT Bearer Tokens
- **User Management**: ASP.NET Identity
- **API Documentation**: Swagger/OpenAPI
- **Architecture**: RESTful API with Repository pattern

## 📁 Project Structure

```
├── Controllers/           # API Controllers
│   ├── AuthenticationController.cs
│   ├── FeedbackController.cs
│   ├── FeedController.cs
│   ├── LivestockController.cs
│   ├── MedicineController.cs
│   └── RequestController.cs
├── Data/                 # Database Context
│   └── ApplicationDbContext.cs
├── Models/               # Entity Models
│   ├── ApplicationUser.cs    # ASP.NET Identity User Model
│   ├── User.cs              # Frontend-compatible User Model
│   ├── Feed.cs
│   ├── Feedback.cs
│   ├── Livestock.cs
│   ├── Medicine.cs
│   ├── Request.cs
│   ├── LoginModel.cs
│   └── UserRoles.cs
├── Services/             # Business Logic Layer
├── Migrations/           # EF Core Migrations
└── Properties/           # Launch Settings
```

## ⚙️ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server 2022](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express)
- [Entity Framework Core Tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ChhatreshKhatri/FarmConnect-WebApi.git
cd FarmConnect-WebApi
```

### 2. Install Dependencies

```bash
dotnet restore
dotnet tool restore
```

### 3. Configure Database Connection

Update the connection string in `appsettings.json` based on your database choice:

**For Local SQL Server:**

```json
{
  "ConnectionStrings": {
    "ConStr": "Your-Local-SQL-Server-Connection-String"
  }
}
```

**For Azure SQL Database:**

```json
{
  "ConnectionStrings": {
    "AzureSQL": "Your-Azure-SQL-Connection-String"
  }
}
```

> **Note**: The application uses the `AzureSQL` connection string by default. If you want to use local SQL Server, update `Program.cs` to use `ConStr` instead.

### 4. Run Database Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 5. Build and Run

```bash
dotnet build
dotnet run
```

### 6. Access the API

- **Swagger UI**: Navigate to `http://localhost:8080/swagger`
- **API Base URL**: `http://localhost:8080`

## 🔧 Configuration

### JWT Settings

Configure JWT authentication in `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "localhost"
  }
}
```

### User Roles

The application supports two user roles managed through ASP.NET Identity:

- **Owner**: Can manage livestock, view medicines/feeds, submit requests
- **Supplier**: Can manage medicine/feed inventory, handle requests

### Database Schema

- **AspNetUsers**: Primary user table
- **AspNetRoles**: Role definitions (Owner, Supplier)
- **AspNetUserRoles**: User-role assignments
- **Entity Tables**: All entities reference AspNetUsers.Id as foreign key

## 📚 API Endpoints

### Authentication

- `POST /api/register` - User registration
- `POST /api/login` - User login (returns JWT)

### Livestock Management (Owner Role)

- `GET /api/livestock` - Get all livestock
- `GET /api/livestock/user/{userId}` - Get livestock by user ID
- `POST /api/livestock` - Create new livestock record
- `PUT /api/livestock/{id}` - Update livestock record
- `DELETE /api/livestock/{id}` - Delete livestock record

### Medicine Management (Supplier Role)

- `GET /api/medicine` - Get all medicines
- `GET /api/medicine/user/{userId}` - Get medicines by user ID
- `POST /api/medicine` - Create new medicine (Supplier)
- `PUT /api/medicine/{id}` - Update medicine (Supplier)
- `DELETE /api/medicine/{id}` - Delete medicine (Supplier)

### Feed Management (Supplier Role)

- `GET /api/feed` - Get all feeds
- `GET /api/feed/user/{userId}` - Get feeds by user ID
- `POST /api/feed` - Create new feed (Supplier)
- `PUT /api/feed/{id}` - Update feed (Supplier)
- `DELETE /api/feed/{id}` - Delete feed (Supplier)

### Request System

- `GET /api/request` - Get requests
- `GET /api/request/user/{userId}` - Get requests by user ID
- `POST /api/request` - Submit new request
- `PUT /api/request/{id}` - Update request status

### Feedback System

- `GET /api/feedback` - Get feedback
- `GET /api/feedback/user/{userId}` - Get feedback by user ID
- `POST /api/feedback` - Submit feedback
- `DELETE /api/feedback/{id}` - Delete feedback

## 🌐 Frontend Application

This API powers the FarmConnect Next.js frontend application.

**Frontend Repository**: [FarmConnect-Next.jsApp](https://github.com/ChhatreshKhatri/FarmConnect-Next.jsApp)
