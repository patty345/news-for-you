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
    mutation addArticle($author: String!, $title: String!, $description: String!, $content: String!, $url: String!, $urlToImage: String!, $publishedAt: String!) {
        addArticle(author: $author, title: $title, description: $description, content: $content, url: $url, urlToImage: $urlToImage, publishedAt: $publishedAt) {
            favoriteArticles {
                _id: _id
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