import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            favoriteArticles {
                _id
                publisher
                title
                description
                content
                url
                urlToImage
                publishedAt
            }
        }
    }
`