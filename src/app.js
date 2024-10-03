import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import dotenv from 'dotenv';
import { verifyToken } from './services/jwtService.js';

dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    // Check if the operation is a "login" mutation
    const isLoginMutation = req.body.query.includes('login');
    if (isLoginMutation) {
      // No authentication required for login
      return {};
    }
    // If it's not a login mutation, enforce authentication
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    try {
      const decoded = verifyToken(token, process.env.JWT_SECRET);
      return { user: decoded };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

export default app;
