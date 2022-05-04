import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            favoriteArticles {
                _id
                author
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