# Snow Pet - Pet Shop

The **Snow Pet Shop** is an application developed in React with TypeScript, designed to manage the operations of a pet shop, including grooming services and the sale of pet products. The application integrates with its own API developed in NestJS and utilizes various libraries for state management, HTTP requests, styling, and UI components.

![Homepage Screenshot](public/screenshot.png)

<p align="center">
  <img src="https://img.shields.io/github/license/viniciussis/Snow_Pet" alt="GitHub license" />
  <img src="https://img.shields.io/github/stars/viniciussis/Snow_Pet" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/viniciussis/Snow_Pet" alt="GitHub forks" />
</p>

You can also check out the live demo of the project [here!](https://my-portfolio-rust-eight-80.vercel.app/)

## Technologies Used

- **React**: Library for building user interfaces.
- **TypeScript**: JavaScript superset that adds static types.
- **Vite**: Fast build tool for modern projects.
- **Axios**: HTTP client for making requests.
- **Tanstack Query**: Library for asynchronous state management and data caching.
- **Zustand**: State management library for the client side.
- **React Hook Form**: Library for form management and validation.
- **Zod**: Schema validation and type inference library.
- **MUI (Material-UI)**: Library for UI components.
- **SASS**: CSS preprocessor for styling, using mixins and variables.

## Features

- Pet management.
- Client management.
- Product inventory control.
- Record of sales and grooming services.
- User-friendly and responsive interface.

## Back-End

- [Snow Pet API](https://github.com/viniciussis/snow_pet_api)

## Prerequisites

Before running the project, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- npm (usually comes with Node.js) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/viniciussis/Snow_Pet.git
   cd Snow_Pet
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

The project structure is as follows:

```
src/
├── api/            # Services for API calls
├──── queries/      # API calls with React-Query
├── assets/         # Static files (images, fonts, styles, etc.)
├──── styles/       # SASS files and mixins
├── components/     # Reusable components
├── hooks/          # Custom hooks
├──── stores/       # Zustand stores
├── pages/          # Application pages
├── shared/         # Everything shared across the application
├──── constants/    # Constants
├──── enums/        # Enums
├──── interfaces/   # Interfaces
├──── schemas/      # Zod Schemas
├── utils/          # Utility functions
├── routes.tsx      # Application routing
└── main.tsx        # Application entry point
```

## Usage

After starting the development server, you can access the application in your browser at [http://localhost:5173](http://localhost:5173).

## Contribution

If you would like to contribute to the project, follow the steps below:

1. **Fork the repository**
2. **Create a branch for your feature:** (`git checkout -b my-feature`)
3. **Commit your changes:** (`git commit -m 'Added my feature'`)
4. **Push to the branch:** (`git push origin my-feature`)
5. **Open a Pull Request**

---

**Developed by Vinícius Silva Santos**
