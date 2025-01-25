# Medium Blog Application

This is a full-stack project built with the following stack:

- **Frontend**: React (TypeScript)
- **Backend**: Cloudflare Workers
- **Validation**: Zod (for schema validation and type inference)
- **ORM**: Prisma (with connection pooling)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Shared Package**: Custom NPM package `@nitishbakshi/medium-common`

---

## Features

- **Authentication**: Secure user authentication using JWT.
- **Validation**: Robust input validation and type inference with Zod.
- **Scalable Backend**: Built on Cloudflare Workers for high performance and scalability.
- **Efficient Database Management**: Prisma as the ORM with connection pooling for PostgreSQL.
- **Shared Utilities**: Common utilities and types exported via `@nitishbakshi/medium-common`.

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL Database
- Cloudflare Account for Workers

### Steps

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd medium-blog
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   npm i @nitishbakshi/medium-common
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the root of the project and add the following:

   ```env
   DATABASE_URL=your_database_url_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Prisma Setup:**

   - Generate Prisma Client:
     ```bash
     npx prisma generate
     ```
   - Apply database migrations:
     ```bash
     npx prisma migrate dev
     ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

---

## File Structure

```
medium-blog/
├── medium-client/       # React frontend
├── medium-server/       # Cloudflare Workers backend
├── common/              # NPM shared package
└── README.md            # Documentation
```

---

## Scripts

### Development

```bash
npm run dev
```

Starts the development server for both frontend and backend.

### Build

```bash
npm run build
```

Builds the project for production.

### Prisma Commands

```bash
npx prisma generate  # Generates Prisma Client
npx prisma migrate dev  # Runs migrations
```

---

## Shared NPM Package

This project uses a custom shared package for common utilities and types.

### Installation

```bash
npm i @nitishbakshi/medium-common
```

### Usage

Example usage in the frontend:

```ts
import { someUtility } from "@nitishbakshi/medium-common";

const result = someUtility(data);
```

---

## Deployment

### Frontend

- Host the React application on any static site hosting service (e.g., Vercel, Netlify, Cloudflare Pages).

### Backend

- Deploy the Cloudflare Workers backend using Wrangler CLI:
  ```bash
  npm run build
  npx wrangler publish
  ```

---

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

---

## Author

**Nitish Bakshi**  
Web Developer and Designer
