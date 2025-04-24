# Postal Service Web Application

This project is a Postal Service web application that demonstrates server-side rendering using Node.js, Express, and EJS. It allows users to manage postal packages, including creating, viewing, updating, and removing packages. The application also features barcode generation and shipping cost calculation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Adding a Package](#1-adding-a-package)
  - [Viewing All Packages](#2-viewing-all-packages)
  - [Viewing Package Details](#3-viewing-package-details)
  - [Updating Package Status](#4-updating-package-status)
  - [Removing a Package](#5-removing-a-package)
  - [Search for a Package](#6-search-for-a-package)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Create a Package:** Add new packages with sender/receiver details, weight, and shipping method.
- **View All Packages:** Display a list of all packages with details like tracking number, weight, and cost.
- **View Package Details:** Access detailed information about a specific package, including a barcode.
- **Update Package Status:** Change the status of a package (e.g., Created, In-Transit, Delivered).
- **Remove a Package:** Delete a package from the system.
- **Generate Barcodes:** Automatically generate barcodes for packages based on their tracking numbers.

## Installation

> [!NOTE]
>
> You will need [Node.js](https://nodejs.org/en/) (version 14 or later) and [npm](https://www.npmjs.com/) installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/postal-service-webapp.git
   cd postal-service-webapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Database Setup

> [!NOTE]
>
> You will need the latest version of [PostgreSQL](https://www.postgresql.org/download/) installed on your machine.

1. **Login as Administrator**

   For Linux users:

   ```bash
   sudo -u postgres psql
   ```

   For macOS users:

   ```bash
   psql -U postgres
   ```

2. **Create a New Database**

   ```sql
   postgres=# CREATE DATABASE package_db;
   ``

3. **Create a Role (User) to Access the Database**

   Login to the newly created database:

   ```sql
   postgres=# \c package_db
   ```

   Create the user role:

   ```sql
   package_db=# CREATE ROLE package_user WITH LOGIN PASSWORD '#password#';
   ```

4. **Grant Permissions to the User**

   ```sql
   package_db=# ALTER DATABASE package_db OWNER TO package_user;
   package_db=# GRANT ALL PRIVILEGES ON DATABASE package_db TO package_user;
   ```

5. **Run the Schema to Create the Table**

   Exit `psql` to return to the terminal command line:

   ```sql
   package_db=# \q
   ```

   Then, run the SQL script to create the necessary table:

   ```bash
   psql -d packages -f src/scripts/schema.sql
   ```

6. **Verify the Table Creation**

   Login to the database again:

   ```bash
   psql -U package_user -d package_db -h localhost
   ```

   Check if the table was created successfully:

   ```sql
   package_db=# \dt
   ```

   You should see a table named `packages` in the list.

> [!WARNING]
>
> The database setup creates a user with the name `package_user` and password `#password#`. These credentials will be used in the `.env` file to connect to the database. You can change the username and password as needed, but make sure to update the `.env` file accordingly.

## Environment Variables

This project uses environment variables to configure the database connection. A `.env.example` file is provided as a template.

Copy the `.env.example` file to create a `.env` file:

```bash
cp .env.example .env
```

> [!WARNING]
>
> The provided `.env` file should be used for development purposes only. For production, consider using more secure credentials in your `.env` file. Ensure that you update the environment variables with your database credentials, if you opted to change them during the database setup.

## Running the App

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Start the Server**

   ```bash
   npm start
   ```

3. **Access the App**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

> [!TIP]
>
> To run the app in development mode with live reloading:
>
> ```bash
> npm run dev
> ```

## Project Structure

The project implementation follows the Model-View-Controller (MVC) architecture. Below is a brief overview of the project structure:

```markdown
postal-service-webapp/
├── .env.example            # Example environment variables file
├── public/                 # Public assets (CSS, JS, images)
├── src/
│   ├── main.ts             # Main application file
│   ├── config/             # Configuration file for database connection
│   ├── controllers/        # Controllers that handle requests and responses
│   ├── interfaces/         # TypeScript interfaces for type safety
│   ├── middleware/         # Middleware functions for logging and error handling
│   ├── models/             # Typescript class implementations of the models
│   ├── routes/             # Route definition for packages
│   ├── scripts/            # SQL script for database setup
│   ├── singletons/         # Singleton class for single instance management
│   ├── utils/              # Utility functions
│   └── views/              # EJS templates for rendering views
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
└── tsconfig.json           # TypeScript configuration file
```

## Usage

### 1. Adding a Package

- Click on the `Add New Package` button found either on the home page or All Packages page.
- Fill in the form with sender/receiver details, weight, and shipping method.
- Click `Create Package` to add the package.

### 2. Viewing All Packages

- Click on the `All Packages` button on the home page.
- A list of all packages will be displayed, including their tracking numbers, weights, and costs.

### 3. Viewing Package Details

- Click on a package's tracking number to view its details.
- The details page will show sender/receiver information, weight, shipping method, status, and a barcode.

### 4. Updating Package Status

- From the package details page, select a new status and click `Update`.
- The status will be updated in the database and reflected on the details page.
- The status options include: `Created`, `In-Transit`, and `Delivered`.

### 5. Removing a Package

- Click on the `Remove Package` button on the home page.
- This will direct you to the Remove Package page where the tracking number of the package to be removed is required to locate it.
- Enter the tracking number and click `Next`.
- If the package is found, the package details are displayed and you will be prompted to either confirm or cancel the removal.
- Click `Remove` to delete the package from the system and the database.
- If the package is not found, an error message will be displayed.

### 6. Search for a Package

- You can search for a package at any time by entering the tracking number in the search bar located in the navigation bar.
- If the package is found, you will be redirected to the package details page.
- If the package is not found, an error message will be displayed.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was developed as part of the **[CMPS2232] Object Oriented Programming** course at the [University of Belize](https://www.ub.edu.bz/).
- Special thanks to Ms. Vernelle Sylvester and Mr. Dalwin Lewis for their guidance and support.
