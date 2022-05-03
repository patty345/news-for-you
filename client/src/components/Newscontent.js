import React from "react";
// import newsAPI from '../utils/API';
import { Row, Card, Col, Button } from "react-bootstrap";
import { searchArticles } from "../utils/API";

const NewsContent = async () => {
  const response = await searchArticles;

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  const { items } = await response.json();

  const newsData = items.map((news) => ({
    newsId: news._id,
    publisher: news.publisher,
    title: news.title,
    description: news.description,
    content: news.content,
    urlToImage: news.urlToImage,
  }));

  return (
    <Row xs={1} md={2} className="g-4">
      {newsData.map((news, idx) => (
        <Col style={{ padding: "5rem" }}>
          <Card>
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Card.Body>
              <Card.Title>{news.title}</Card.Title>
              <Card.Text>{news.text}</Card.Text>
              <Button variant="info">Save to Favorites</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsContent;
