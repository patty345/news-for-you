import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_FAVORITE_ARTICLE } from '../utils/mutations'

import Auth from '../utils/auth'
const FavoriteNews = () =>  {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeArticle, { error }] = useMutation(DELETE_FAVORITE_ARTICLE);

    const userInfoData = data?.me || {};
    const { data: userData } = useQuery(QUERY_ME);
    const userInfoLength = Object.keys(userInfoData).length;
    console.log(userData)
    const handleDeleteFavorite = async (_id) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if(!token) {
        return false;
      }

      try {
        const{ data } = await removeArticle({
          variables: { _id },
        })

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
          {userData.map((me, idx) => (
    <Col style={{ padding: '5rem'}}>
      <Card>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
        <Card.Body>
          <Card.Title>{me.favoriteArticle.author}</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Button onClick={handleDeleteFavorite()} variant='danger'>Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>  
        </>
    )
}
export default FavoriteNews;