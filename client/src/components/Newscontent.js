import React from 'react';
import { Row, Card, Col, Button } from 'react-bootstrap';


const NewsContent = () => {

    const newsData = [
        {"img": "", title: "title01", text:"text1"},
        {"img": "", title: "title02", text:"text2"},
        {"img": "", title: "title03", text:"This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}
    ]

    return(
        <Row xs={1} md={2} className="g-4">
  {newsData.map((news, idx) => (
    <Col style={{ padding: '5rem'}}>
      <Card>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
        <Card.Body>
          <Card.Title>{news.title}</Card.Title>
          <Card.Text>
            {news.text}
          </Card.Text>
          <Button variant='info'>Save to Favorites</Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    )
}

export default NewsContent;