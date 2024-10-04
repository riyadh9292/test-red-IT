import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  scalar Long

  type Action {
    _id: ID!
    name: String!
    description: String
    functionString: String
    params: JSON
    resourceTemplateId: ID
    createdAt: Long!
    updatedAt: Long!
  }

  type Trigger {
    _id: ID!
    name: String!
    description: String
    params: JSON
    functionString: String
    resourceTemplateId: ID
    createdAt: Long!
    updatedAt: Long
  }

  type Response {
    _id: ID!
    name: String!
    description: String
    platforms: [ResponsePlatform]
    createdAt: Long!
    updatedAt: Long
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
    colour: String
    preActions: [Action]    
    postActions: [Action]
    parents:[NodeObject]
    parentIds: [ID]
    trigger: Trigger
    triggerId: ID
    responses: [Response]
    responseIds: [ID]
    actions: [Action]
    actionIds: [ID]
    priority: Float
    compositeId: ID
    global: Boolean
    root: Boolean           
    redirect: Redirect      
    analytics: JSON         
    memberTagging: JSON     
    type: String            
    tags: [String]          
    saveCompositeId: Boolean
    createdAt: Long!
    updatedAt: Long!
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
    createdAt: Long
    updatedAt: Long!
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
