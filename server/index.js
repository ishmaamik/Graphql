import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5'
import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

const typeDefs = `#graphql

    type User {
        id: ID!
        name: String!
    }
    type Todo {
        id: ID!
        title: String!
        userId: ID!
        user: User
    }

    type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUserbyId(id: ID!): User
    }
`;

const resolvers = {
    Todo:{
        user: async(parent) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${parent.userId}`)).data 
    },
    Query: {
        getTodos: async() => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        getAllUsers: async() => (await (axios.get('https://jsonplaceholder.typicode.com/users'))).data,
        getUserbyId: async(parent, {id}) => (await (axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))).data
    }
};

const MyApp =async ()=>{
    const app= express()
    const server= new ApolloServer({
        typeDefs,
        resolvers
    });
    
    const PORT= process.env.PORT
    
    await server.start()
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/graphql', expressMiddleware(server));

    app.listen(PORT, ()=>
        console.log(`Server started at ${PORT}`)
    )
}

MyApp()