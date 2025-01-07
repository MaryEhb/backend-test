# Product Inventory System

Product Inventory System API, built with Node.js, Express, MongoDB, and JWT Authentication.

## Project Setup

To get the project running on your local machine, please follow the steps below.

### 1. Clone the Repository

First, fork and clone the repository to your local machine:

```bash
git clone https://github.com/MaryEhb/backend-test.git
cd backend-test/product-inventory-api
```

### 2. Install Dependencies

Run `npm install` to install all the necessary dependencies.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. The `.env` file should **not** be committed to version control (ensure it’s listed in `.gitignore`).

```bash
# Server Token
PORT=8081

# Set to 'true' if connecting to a local MongoDB instance
USE_LOCAL_DB=true

# MongoDB Connection Details for Local
LOCAL_DB_HOST=localhost
LOCAL_DB_PORT=27017
LOCAL_DB_NAME=product-inventory

# MongoDB Connection Details for Remote (leave blank if not using remote DB)
REMOTE_DB_USER=
REMOTE_DB_PASSWORD=
REMOTE_DB_HOST=
REMOTE_DB_PORT=
REMOTE_DB_NAME=

# Secret for auth tokens
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION_DAYS=7

# Set to 'production' when in production for HTTPS (for cookie protection)
NODE_ENV=development
```

#### Explanation of Environment Variables:

- `PORT`: Port number for the server to run on.
- `USE_LOCAL_DB`: Set to `true` if you are using a local MongoDB instance.
- `LOCAL_DB_HOST`, `LOCAL_DB_PORT`, `LOCAL_DB_NAME`: MongoDB configuration for a local setup.
- `REMOTE_DB_*`: MongoDB configuration for a remote setup (optional). If you are using a remote database, fill in the necessary details.
- `JWT_SECRET`: A secret key used to sign and verify JWT tokens (replace with your actual secret).
- `JWT_EXPIRATION_DAYS`: The number of days until the JWT token expires.
- `NODE_ENV`: The environment mode, which can be either `development` or `production`.

### 4. Run the Application

After configuring the environment variables, you can start the server using the following command:

```bash
npm start
```

The server will be running on the port specified in the `.env` file (default: `8081`).

### 5. API Endpoints

- **POST /auth/login**: Login with credentials to receive a JWT token.
- **POST /products**: Add a new product (admin only).
- **GET /products**: List all products with pagination.
- **GET /products/:id**: Get a single product by its ID.
- **PUT /products/:id**: Update a product (admin only).
- **DELETE /products/:id**: Delete a product (admin only).

### 6. Testing

For testing the API endpoints, ensure that the `.env` file is properly set up, and use any API testing tool like **Postman** or **Insomnia** to send requests to the running server.
