import fs from 'fs';
import path from 'path';
import { generateToken } from '../../services/jwtService.js';

const readJsonFile = (filePath) => {
  const jsonData = fs.readFileSync(path.resolve(filePath), 'utf-8');
  return JSON.parse(jsonData);
};

// Load the data
const actions = readJsonFile('src/data/actions.json');
const triggers = readJsonFile('src/data/triggers.json');
const nodes = readJsonFile('src/data/nodes.json');
const responses = readJsonFile('src/data/responses.json');
const resourceTemplates = readJsonFile('src/data/resourceTemplates.json');

const mockUser={
  username: 'admin',
  password: 'admin',
  userId: 1
}

export const resolvers = {
  Query: {
    node: (_, { nodeId }) => nodes.find(node => node._id === nodeId),
    actions: () => actions,
    triggers: () => triggers,
    nodes: () => nodes,
    responses: () => responses,
    resourceTemplates: () => resourceTemplates,
  },

  NodeObject: {
    trigger: (node) => triggers.find((trigger) => trigger._id === node.trigger),
    responses: (node) => responses.filter((response) => node.responses?.includes(response._id)),
    actions: (node) => actions.filter((action) => node.actions?.includes(action._id)),
  },

  Mutation: {
    login: (_, { username, password }) => {      
    
      if (username === mockUser.username && password === mockUser.password) {        
        const token = generateToken({
          username: mockUser.username,
          password: mockUser.password,
        });
        
        return { token };
      }
      throw new Error('Invalid credentials');
    }
  }
};
