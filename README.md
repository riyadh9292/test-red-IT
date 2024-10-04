
# GraphQL API Server - Backend Engineer Code Test

## Deployment

The API is deployed and can be accessed at the following link:

**[Deployed API URL](https://test-red-it.onrender.com/graphql)**


This project implements a **GraphQL API Server** using **Node.js** and **Apollo Server**. The server supports a pre-defined schema and uses JSON files as the data source. The API is secured using **Bearer Token** authentication.

## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Running the Server](#running-the-server)
5. [Testing the API](#testing-the-api)
6. [Authentication](#authentication)
7. [Example Queries](#example-queries)
8. [Folder Structure](#folder-structure)
9. [License](#license)

## Requirements

Ensure you have the following installed on your system:

- **Node.js** (>= v14.x)
- **npm** or **yarn**
- **Postman** or any GraphQL client for testing the API

## Installation

Follow these steps to set up and run the project:

1. **Download or clone the repository:**

   Download the project folder named `test-red-IT`, or clone the repository:
   
   ```bash
   git clone https://github.com/yourusername/test-red-IT.git
   ```

2. **Navigate into the project folder:**

   ```bash
   cd test-red-IT
   ```

3. **Install the required dependencies:**

   Using **npm**:

   ```bash
   npm install
   ```

   Or using **yarn**:

   ```bash
   yarn install
   ```

## Environment Variables

You need to create a `.env` file in the root directory to store environment variables such as the server port and the JWT secret for authentication.

Create a `.env` file with the following contents:

```
PORT=4000
JWT_SECRET=TheRedIT
```

- **PORT**: The port on which the server will run (default is `4000`).
- **JWT_SECRET**: The secret key used to sign and verify JWT tokens. Change this to something secure.

## Running the Server

To start the server, use the following commands:

1. **Start the server** using npm or yarn:

   Using **npm**:
   ```bash
   npm start
   ```

   Or using **yarn**:
   ```bash
   yarn start
   ```

   The server will be running at `http://localhost:4000/graphql`.

2. **Development Mode** (with automatic reloads on code changes):

   Using **npm**:
   ```bash
   npm run dev
   ```

   Or using **yarn**:
   ```bash
   yarn dev
   ```

## Testing the API

Once the server is running, you can test the API using **Postman**, **Insomnia**, or any other GraphQL client.

### 1. **Login to Get the Bearer Token**

Send a POST request to `http://localhost:4000/graphql` with the following GraphQL mutation to log in:

```graphql
{
  "query": "mutation { login(username: \"admin\", password: \"admin\") { token } }"
}

```

This will return a JWT token if the credentials are correct. Use this token to authenticate all further requests.

### 2. **Use the Token for Authenticated Requests**

Include the JWT token in the **Authorization** header for any subsequent queries or mutations. For example:

```
Authorization: Bearer your-jwt-token-here
```

### 3. **Example Queries**

#### Fetch a NodeObject by ID

```graphql
{
  "query": "query { node(nodeId: \"6296be3470a0c1052f89cccb\") { _id name description trigger { _id name } parents { _id name } responses { _id name } actions { _id name } } }"
}
```

#### Fetch All Actions

```graphql
{
  "query": "query { actions { _id name description createdAt updatedAt functionString resourceTemplateId } }"
}

```

#### Fetch All Responses

```graphql
{
  "query": "query { responses { _id name description platforms { integrationId build localeGroups { localeGroup variations { name responses { type text id transform } } } } } }"
}

```

## Authentication

This API is secured using **Bearer Token** authentication. To make any query or mutation, you first need to log in and obtain a token. You then use this token to authenticate all subsequent API requests.

### Steps:

1. **Log in** using the `login` mutation (described above) to get a token.
2. **Include the token** in the `Authorization` header when making requests. Example header:

```
Authorization: Bearer your-jwt-token
```

3. **Send your GraphQL queries** with authentication for fetching data.

## Folder Structure

Here's an overview of the project's folder structure:

```
test-red-IT/
├── src/
│   ├── data/
│   │   ├── actions.json
│   │   ├── triggers.json
│   │   ├── nodes.json
│   │   ├── responses.json
│   │   └── resourceTemplates.json
│   ├── graphql/
│   │   ├── schema/
│   │   │   └── index.js
│   │   ├── resolvers/
│   │   │   └── index.js
│   ├── middleware/
│   │   └── auth.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Key Files:
- **app.js**: Entry point for the application.
- **graphql/schema/index.js**: Contains the GraphQL schema definitions.
- **graphql/resolvers/index.js**: Contains the resolvers for the GraphQL queries and mutations.
- **middleware/auth.js**: Authentication middleware for verifying JWT tokens.
- **data/**: Contains JSON files used as the data source for the API.
