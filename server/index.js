import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5'
import dotenv from 'dotenv'

dotenv.config()

const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World!"
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