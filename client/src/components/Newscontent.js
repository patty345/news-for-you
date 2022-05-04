import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { searchArticles } from "../utils/API";
import { useMutation } from "@apollo/client";

import { ADD_FAVORITE_ARTICLE } from "../utils/mutations";




const NewsContent = () => {
  const [articles, setArticles] = useState([]);

  const [addArticle, { error }] = useMutation(ADD_FAVORITE_ARTICLE);

  const handleFavoriteAricle = async (article) => {
    console.log(article);
    try {
      await addArticle({
        variables: { ...article},
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleArticles = async () => {
    
    try {
      const response = await searchArticles();

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const { articles } = await response.json();

      const newsData = articles.map((news) => ({
        author: news.author,
        title: news.title,
        description: news.description,
        content: news.content,
        publishedAt: news.publishedAt,
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
              <Button onClick={() => handleFavoriteAricle(news)} variant="info">Save to Favorites</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsContent;
