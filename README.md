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
- **Medicine Management**: Create, edit, and manage medicine inventory
- **Feed Management**: Handle feed products and inventory tracking
- **Request System**: Submit and manage resource requests between roles
- **Feedback System**: Customer feedback and supplier response management

## 🛠️ Tech Stack

- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server 2022
- **ORM**: Entity Framework Core 8.0
- **Authentication**: JWT Bearer Tokens
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
│   ├── ApplicationUser.cs
│   ├── Feed.cs
│   ├── Feedback.cs
│   ├── Livestock.cs
│   ├── Medicine.cs
│   ├── Request.cs
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
The application supports two user roles:
- **Owner**: Can manage livestock, view medicines/feeds, submit requests
- **Supplier**: Can manage medicine/feed inventory, handle requests

## 📚 API Endpoints

### Authentication
- `POST /api/Authentication/login` - User login
- `POST /api/Authentication/register` - User registration

### Livestock Management (Owner Role)
- `GET /api/Livestock` - Get all livestock
- `POST /api/Livestock` - Create new livestock record
- `PUT /api/Livestock/{id}` - Update livestock record
- `DELETE /api/Livestock/{id}` - Delete livestock record

### Medicine Management
- `GET /api/Medicine` - Get all medicines
- `POST /api/Medicine` - Create new medicine (Supplier)
- `PUT /api/Medicine/{id}` - Update medicine (Supplier)
- `DELETE /api/Medicine/{id}` - Delete medicine (Supplier)

### Feed Management
- `GET /api/Feed` - Get all feeds
- `POST /api/Feed` - Create new feed (Supplier)
- `PUT /api/Feed/{id}` - Update feed (Supplier)
- `DELETE /api/Feed/{id}` - Delete feed (Supplier)

### Request System
- `GET /api/Request` - Get requests
- `POST /api/Request` - Submit new request
- `PUT /api/Request/{id}` - Update request status

### Feedback System
- `GET /api/Feedback` - Get feedback
- `POST /api/Feedback` - Submit feedback
- `PUT /api/Feedback/{id}` - Update feedback

## 🌐 Frontend Application

This API powers the FarmConnect Next.js frontend application.

**Frontend Repository**: [FarmConnect-Next.jsApp](https://github.com/ChhatreshKhatri/FarmConnect-Next.jsApp)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
