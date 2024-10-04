import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import dotenv from 'dotenv';
import { verifyToken } from './services/jwtService.js';
import { MissingFieldError } from './utils/errors.js';

dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const isLoginMutation = req.body.query.includes('login');
    if (isLoginMutation) {
      return {};
    }
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
  formatError: (err) => {
    if (err.originalError instanceof MissingFieldError) {
      return {
        message: err.message,
        code: err.originalError.code,
        field: err.originalError.field,
        type: err.originalError.type,
      };
    }
    return err;
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

export default app;
