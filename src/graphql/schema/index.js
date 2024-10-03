import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  scalar BigInt

  type Action {
    _id: ID!
    name: String!
    description: String
    functionString: String
    params: JSON
    resourceTemplateId: ID
    createdAt: BigInt!
    updatedAt: BigInt!
  }

  type Trigger {
    _id: ID!
    name: String!
    description: String
    params: JSON
    functionString: String
    resourceTemplateId: ID
    createdAt: BigInt!
  }

  type Response {
    _id: ID!
    name: String!
    description: String
    platforms: [ResponsePlatform]
    createdAt: BigInt!
    updatedAt: BigInt
  }

  type ResponsePlatform {
    integrationId: String
    build: Float
    localeGroups: [ResponseLocaleGroup]
  }

  type ResponseLocaleGroup {
    localeGroup: String
    variations: [ResponseVariation]
  }

  type ResponseVariation {
    name: String
    responses: [ResponseData]
  }

  type ResponseData {
    type: String
    text: String
    id: String
    transform: String
  }

  type NodeObject {
    _id: ID!
    name: String!
    description: String
    preActions: [Action]    
    postActions: [Action]
    parents:[NodeObject]
    trigger: Trigger
    responses: [Response]
    actions: [Action]
    compositeId: String
    global: Boolean
    root: Boolean           
    redirect: Redirect      
    analytics: JSON         
    memberTagging: JSON     
    type: String            
    tags: [String]          
    saveCompositeId: Boolean
    createdAt: BigInt!
    updatedAt: BigInt!
    position: Position
  }

  type Position {
    x: Float                      
    y: Float                     
  }

   type Redirect {
    nodeCompositeId: String
    sendResponse: Boolean
    runPreAction: Boolean
    runPostAction: Boolean
  }


  type ResourceTemplate {
    _id: ID!
    name: String!
    description: String
    schema: JSON
    integrationId: String
    functionString: String
    key: String
    updatedAt: BigInt!
  }

  type Query {
    node(nodeId: ID): NodeObject
    actions: [Action]
    triggers: [Trigger]
    nodes: [NodeObject]
    responses: [Response]
    resourceTemplates: [ResourceTemplate]
  }

  type LoginPayload {
    token: String!
  }

  type Mutation {
    login(username: String!, password: String!): LoginPayload!
  }
`;
