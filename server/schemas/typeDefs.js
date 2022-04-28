const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
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

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addArticle(userId: ID!, articleBody: String): User
    }
`

module.exports = typeDefs;