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

## Next.js Frontend
To run the Next.js frontend application, you will need to have Node.js installed on your machine.

Frontend Repository: [FarmConnect-Next.jsApp](https://github.com/ChhatreshKhatri/FarmConnect-Next.jsApp)

To start the project, follow these steps:
- Clone the frontend repository: `git clone https://github.com/ChhatreshKhatri/FarmConnect-Next.jsApp.git`
- cd FarmConnect-Next.jsApp
- npm install
- Create a `.env.local` file and set `NEXT_PUBLIC_API_URL=http://localhost:8080` (or your API URL)
- npm run dev
- Navigate to `http://localhost:3000` in your web browser to view the application.

**Note:** The Next.js frontend requires this Web API backend to be running. Make sure to start the Web API first, then configure the frontend to point to the correct API endpoint.
