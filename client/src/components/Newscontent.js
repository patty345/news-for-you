import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { searchArticles } from "../utils/API";

import { Link } from 'react-router-dom';




const NewsContent = () => {
  const [articles, setArticles] = useState([]);
  

  const handleArticles = async (event) => {
    event.preventDefault();
    try {
      const response = await searchArticles();

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const { articles } = await response.json();

      const newsData = articles.map((news) => ({
        publisher: news.publisher,
        title: news.title,
        description: news.description,
        content: news.content,
        url: news.url,
        urlToImage: news.urlToImage,
      }));

      setArticles(newsData);
    } catch (err) {
      return console.log(err);
    }
  };
  let count = 0;
  useEffect(() => {
    handleArticles();
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      
      {articles.map((news, idx) => (
          
        <Col key={count++} style={{ padding: "5rem" }}>
          <Card>
            <Card.Img variant="top" src={news.urlToImage} />
            <Card.Body>
              <Card.Title key={news.id}>{news.title}</Card.Title>
              <Card.Text key={news.id}>{news.description}</Card.Text>
              <Button variant="info"><a href={news.url}>View Article</a></Button>
              <Button variant="info">Save to Favorites</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsContent;
