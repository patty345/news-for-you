import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_FAVORITE_ARTICLE } from '../utils/mutations'

import Auth from '../utils/auth'
const FavoriteNews = () =>  {
    let count = 0;
    const { loading, data } = useQuery(QUERY_ME);
    const [removeArticle] = useMutation(DELETE_FAVORITE_ARTICLE);
    const favoriteArticles = data?.me.favoriteArticles || [];
    const handleDeleteFavorite = async (_id) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if(!token) {
        return false;
      }

      try {
        const{ data } = await removeArticle({
          variables: { _id },
        })

        document.location.reload();

      } catch (err) {
        console.log(err)
      }
    }

    if (loading) {
      return <h2>LOADING.....</h2>
    }
  
    return(
        <>
          <Row xs={1} md={2} className="g-4">
          {(Auth.loggedIn())?favoriteArticles.map((me, idx) => (
            <Col key={count++} style={{ padding: '5rem'}}>
              <Card>
                <Card.Img variant="top" src={me.urlToImage} />
                <Card.Body>
                  <Card.Title>{me.author}</Card.Title>
                  <Card.Text>
                    {me.description}
                  </Card.Text>
                  <Button variant="info"><a href={me.url}>View Article</a></Button>
                  <Button onClick={() => handleDeleteFavorite(me._id)} variant='danger'>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          )):
            <h1>Please Log In</h1>
          }
          </Row>  
        </>
    )
}
export default FavoriteNews;