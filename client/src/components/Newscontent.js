import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { searchArticles }from "../utils/API";



const NewsContent = () => {

    const [articles, setArticles] = useState([])

    
  
    const handleArticles = async () => {

        const response = await searchArticles(1);
    
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

      setArticles(newsData)
    }
    handleArticles()
  return (
    <Row xs={1} md={2} className="g-4">
      {articles.map((news, idx) => (
        <Col style={{ padding: "5rem" }}>
          <Card>
            <Card.Img
              variant="top"
              src={news.urlToImage}
            />
            <Card.Body>
              <Card.Title>{news.title}</Card.Title>
              <Card.Text>{news.description}</Card.Text>
              <Button variant="info">Save to Favorites</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsContent;
