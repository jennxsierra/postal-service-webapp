# Postal Service Web Application

This project is a web application for managing postal packages. It allows users to create, view, update, and remove packages. The application also includes features for generating barcodes and calculating shipping costs.

## Assumptions

- An **Employee** class was not created since the lab instructions did not specify anything about employees. However, it can be added if needed.
- The application uses a simple **in-memory data store** for packages. In a real-world scenario, this would be replaced with a database.
- The application includes **test data** that is loaded when the server starts. This data is stored in `testData.json`.

## Project Structure

```bash
.
├── data
│   └── testData.json
├── database-tables.sql
├── dist
│   └── server.js
├── package.json
├── package-lock.json
├── public
│   └── styles.css
├── README.md
├── src
│   ├── classes
│   │   ├── OneDayPackage.ts
│   │   ├── Package.ts
│   │   ├── PostalSystem.ts
│   │   └── TwoDayPackage.ts
│   ├── controllers
│   │   ├── barcodeController.ts
│   │   └── packageController.ts
│   ├── enums.ts
│   ├── middleware
│   │   ├── loadTestData.ts
│   │   ├── logger.ts
│   │   └── validatePackage.ts
│   ├── routes
│   │   └── packageRoutes.ts
│   ├── server.ts
│   ├── singletons
│   │   └── postalSystem.ts
│   ├── utils
│   │   ├── costCalculator.ts
│   │   └── trackingNumberGenerator.ts
│   └── views
│       ├── 404.ejs
│       ├── index.ejs
│       ├── packages
│       │   ├── confirmRemove.ejs
│       │   ├── details.ejs
│       │   ├── list.ejs
│       │   ├── new.ejs
│       │   └── remove.ejs
│       └── partials
│           ├── footer.ejs
│           └── header.ejs
└── tsconfig.json
```

---

## How to Use

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/postal-service-webapp.git
   ```

### Running the Application

1. **Install the dependencies**:

   ```bash
   cd postal-service-webapp
   npm install
   ```

2. **Build the project**:

   ```bash
   npm run build
   ```

3. **Start the server**:

   ```bash
   npm start
   ```

4. **Navigate to link:**  
    You can either click [here](http://localhost:3000) to open the application or click the `http://localhost:3000` link displayed in your browser.

---

## Development Mode

To run the application in development mode with automatic reloading:

```bash
npm run dev
```

This will use `nodemon` (or similar) to watch for file changes and automatically restart the server.

---

## Features

- **Create a Package**: Navigate to `/packages/new` to create a new package.
- **View All Packages**: Navigate to `/packages` to view a list of all packages.
- **View Package Details**: Click on a package's tracking number in the list to view its details.
- **Update Package Status**: Update the status of a package from its details page.
- **Remove a Package**: Navigate to `/packages/remove` to remove a package.
- **Generate Barcode**: View the barcode for a package from its details page.

---

## Database

The project includes a SQL script (`database-tables.sql`) for creating the necessary database tables. This script is not currently used by the application but can be used to set up a database if needed.

---

## Test Data

Test data is loaded from **`testData.json`** when the server starts. This data includes sample packages for testing purposes.

---

## Additional Notes

- The application uses **EJS** for templating and **Express** for the server.
- Middleware is used for **logging requests** and **validating package data**.
- The **PostalSystem** class manages the packages and provides methods for adding, finding, and removing packages.

---

## Future Enhancements

- Add an **Employee** class and related functionality.
- Integrate with a real database.
- Add **user authentication** and **authorization**.
