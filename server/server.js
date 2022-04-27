const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');


const db = require('./config/connection');

const PORT = require('./config/connection');
const app = express();

const startServer = async () => {
    const server = new ApolloServer({

    });
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

app.use(express.urelencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});