# FarmConnect
FarmConnect simplifies livestock management for owners and suppliers. It's a user-friendly platform that streamlines tasks like tracking livestock health, managing medicine and feed inventory, and handling resource requests. With FarmConnect, users can efficiently care for livestock and ensure a steady supply of essential resources, fostering productivity and collaboration in the agricultural community.

## .NET Web API
To run .NET web api, you will need to have the following software installed on your machine:
- Dotnet 8
- SQL Server 2022

To start the project, follow these steps:
- cd dotnetapp
- dotnet restore
- dotnet tool restore
- dotnet build
- set connection string in appsettings.json

Code first approach:
- dotnet ef migrations add InitialCreate
- dotnet ef database update

Finally, run the project:
- dotnet run
- Navigate to `http://localhost:8080/swagger` in your web browser to view the application.

## Angular Frontend
To run Angular website, you will need to have the following software installed on your machine:
- Node.js
- Angular 18

To start the project, follow these steps:
- cd angularapp
- npm install
- ng serve
- Navigate to `http://localhost:8081` in your web browser to view the application.
