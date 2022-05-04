const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        favoriteArticles: [Article]
    }

    type Article {
        _id: ID
        publisher: String
        title:  String
        description: String
        content: String
        url: String
        urlToImage: String
        publishedAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addArticle(author: String!, title: String!, description: String!, content: String!, url: String!, urlToImage: String!, publishedAt: String!): User
        deleteArticle(_id: ID!): User
    }
`

module.exports = typeDefs;