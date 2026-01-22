# Contact Information Application - Afisol

A full-stack web application for managing contact information with a .NET Core backend and Angular frontend.

## 📋 Project Overview

This project consists of two main components:
- **Backend**: ASP.NET Core 8.0 REST API with Entity Framework Core and SQL Server
- **Frontend**: Angular 20+ single-page application with TypeScript

## 🏗️ Architecture

```
todo-task-app/
├── ContactApp/          # .NET Core Backend
│   ├── Controllers/     # API endpoints
│   ├── Models/          # Data models
│   ├── Data/            # Database context
│   ├── Migrations/      # EF Core migrations
│   └── Views/           # Razor views (if used)
├── todo-ui/             # Angular Frontend
│   ├── src/
│   │   ├── app/         # Application components & services
│   │   ├── assets/      # Static assets
│   │   └── styles.css   # Global styles
│   └── angular.json     # Angular configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **SQL Server** (LocalDB or full edition)
- **Angular CLI** - `npm install -g @angular/cli`

### Backend Setup (ContactApp)

1. Navigate to the backend directory:
```bash
cd ContactApp
```

2. Install dependencies:
```bash
dotnet restore
```

3. Update database connection string in `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ContactDb;Trusted_Connection=true;"
}
```

4. Apply migrations:
```bash
dotnet ef database update
```

5. Run the backend:
```bash
dotnet run
```

The API will be available at: `http://localhost:5135`

### Frontend Setup (todo-ui)

1. Navigate to the frontend directory:
```bash
cd todo-ui
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/app/services/contact.service.ts` if needed:
```typescript
private apiUrl = 'http://localhost:5135/api';
```

4. Start the development server:
```bash
ng serve
```
or
```bash
npm start
```

The application will be available at: `http://localhost:4200`
```



## 🛠️ Technology Stack

### Backend
- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server with Entity Framework Core
- **Architecture**: MVC / API Pattern
- **Language**: C#

### Frontend
- **Framework**: Angular 20+
- **Language**: TypeScript
- **Build Tool**: Angular CLI / Vite
- **Styling**: CSS

## 📦 Project Structure

### Backend (ContactApp)
```
Controllers/
  ├── ContactsController.cs  # Contact CRUD operations
  └── HomeController.cs      # Home page

Models/
  ├── ContactModel.cs        # Contact entity
  ├── CountryModel.cs        # Country reference
  └── ErrorViewModel.cs      # Error handling

Data/
  └── ContactDbContext.cs    # EF Core context

Migrations/
  └── 20260122160156_InitialCreate.cs
```

### Frontend (todo-ui)
```
src/app/
  ├── app.component.*        # Root component
  ├── models/
  │   └── contact.ts        # Contact interface
  ├── services/
  │   └── contact.service.ts # API service
  └── [feature components]
```





For issues or questions, please create an issue in the GitHub repository.

---

**Last Updated**: January 22, 2026
