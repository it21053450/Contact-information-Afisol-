# Contact Information Application

A full-stack web application for managing contact information with .NET Core backend and Angular frontend.

## Project Structure

- **ContactApp/** - ASP.NET Core 8.0 backend API
- **todo-ui/** - Angular 20+ frontend application

## Backend Setup

1. Navigate to ContactApp folder
2. Run: `dotnet restore`
3. Update connection string in `appsettings.json`
4. Run: `dotnet ef database update`
5. Run: `dotnet run`

Backend runs on: `http://localhost:5135`

## Frontend Setup

1. Navigate to todo-ui folder
2. Run: `npm install`
3. Run: `ng serve`

Frontend runs on: `http://localhost:4200`

## Technologies

- **Backend**: ASP.NET Core 8, Entity Framework Core, SQL Server
- **Frontend**: Angular 20+, TypeScript

## Main Features

- View all contacts
- Add new contact
- Update contact information
- Delete contacts
- Search contacts

## Prerequisites

- .NET 8 SDK
- Node.js 20+
- SQL Server (LocalDB)
