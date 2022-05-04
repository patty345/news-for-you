import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_FAVORITE_ARTICLE = gql`
    mutation addArticle($username: String!, $publisher: String!, $title: String!, $description: String!, $content: String!, $url: String!, $urlToImage: String!, $publishedAt: String!) {
        addArticle(username: $username, publisher: $publisher, title: $title, description: $description, content: $content, url: $url, urlToImage: $urlToImage, publishedAt: $publishedAt) {
            favoriteArticle {
                _id: ID
                publisher: String
                title:  String
                description: String
                content: String
                url: String
                urlToImage: String
                publishedAt: String
            }
        }
    }
`;

export const DELETE_FAVORITE_ARTICLE = gql`
    mutation deleteArticle($_id: ID!) {
        deleteArticle(_id: $_id) {
            _id
        }
    }
`;