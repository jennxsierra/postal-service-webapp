# Postal Service Web Application

> [!NOTE]  
> This application was created for educational purposes and is not intended for production use. It does not implement security features or backend functionality.

This project is a web application for managing postal packages created for [CMPS2232] Object Oriented Programming. It implements languages and tools learned in [CMPS2212] GUI Programming. These include **TypeScript**, **Node.js**, **Express**, and **EJS**.

In short, the application allows users to create, view, update, and remove packages. It also includes features for generating barcodes and calculating shipping costs that are integrated into the application.

## Assumptions

- An **Employee** class was not created since the lab instructions did not specify anything about employees. However, it can be added if needed.
- The application uses a simple **in-memory data store** for packages. In a real-world scenario, this would be replaced with a database.
- The application includes **test data** that is loaded when the server starts. This data is stored in `testData.json`.

---

## Project Structure

```bash
.
├── data                                  # Data files
│   └── testData.json                     # Test data for packages
├── database-tables.sql                   # SQL for  database tables
├── dist                                  # Compiled files
│   └── server.js                         # Compiled server file
├── package.json                          # Project configuration
├── package-lock.json                     # Dependency lock file
├── public                                # Static files
│   └── styles.css                        # CSS styles
├── README.md                             # Project documentation
├── screenshots                           # Application screenshots
│   ├── all-packages.png
│   ├── homepage.png
│   ├── new-pkg.png
│   ├── pkg-details.png
│   ├── remove-pkg-1.png
│   └── remove-pkg-2.png
├── src                                   # Source files
│   ├── classes                           # TypeScript classes
│   │   ├── OneDayPackage.ts              # OneDayPackage class
│   │   ├── Package.ts                    # Abstract Package class
│   │   ├── PostalSystem.ts               # Package management class
│   │   └── TwoDayPackage.ts              # TwoDayPackage class
│   ├── controllers                       # Route controllers
│   │   ├── barcodeController.ts          # Barcode generator controller
│   │   └── packageController.ts          # All package-related routes
│   ├── enums.ts                          # Enumerator classes
│   ├── middleware                        # Middleware functions
│   │   ├── loadTestData.ts               # Load test data middleware
│   │   ├── logger.ts                     # Request logger middleware
│   │   └── validatePackage.ts            # Package data validation middleware
│   ├── routes                            # Route definitions
│   │   └── packageRoutes.ts              # All package-related routes
│   ├── server.ts                         # Express server setup
│   ├── singletons                        # Classes with single instances
│   │   └── postalSystem.ts               # New instance of PostalSystem
│   ├── utils                             # Helper functions
│   │   ├── costCalculator.ts             # Shipping cost calculator
│   │   ├── networkUtils.ts               # IP retrieval used in start message
│   │   └── trackingNumberGenerator.ts    # Tracking number generator
│   └── views                             # EJS page templates
│       ├── 404.ejs                       # 404 error page
│       ├── index.ejs                     # Home page
│       ├── packages                      # All package-related views
│       │   ├── confirmRemove.ejs         # Confirm package removal
│       │   ├── details.ejs               # Package details page
│       │   ├── list.ejs                  # List of all packages
│       │   ├── new.ejs                   # Create a new package
│       │   └── remove.ejs                # Remove a package
│       └── partials                      # Reusable components
│           ├── footer.ejs                # Footer code
│           └── header.ejs                # Header code
└── tsconfig.json                         # TypeScript configuration
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

2. **Navigate to the project directory**:

   ```bash
   cd postal-service-webapp
   ```

### Running the Application

1. **Install the dependencies**:

   ```bash
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
    You can either click [here](http://localhost:3000) to open the application or click the `http://localhost:3000` link displayed in your terminal.

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

---

## Acknowledgements

- Thank you to Ms. Vernelle Sylvester for providing her expertise and guidance on Object Oriented Design and Programming.
- Thank you to Mr. Dalwin Lewis for providing the necessary skills and knowledge on the tools and languages used in this project.
