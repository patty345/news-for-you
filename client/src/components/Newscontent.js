import React, { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { searchArticles } from "../utils/API";
import { useMutation } from "@apollo/client";
// import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import { ADD_FAVORITE_ARTICLE } from "../utils/mutations";




const NewsContent = () => {
  const [articles, setArticles] = useState([]);
  // const { loading, data } = useQuery(QUERY_ME);
  // const me = data?.me || {};
  const [addArticle] = useMutation(ADD_FAVORITE_ARTICLE);

  const handleFavoriteAricle = async (article) => {
    console.log(article);
    try {
      await addArticle({
        variables: { ...article },
      });
    } catch (error) {
      console.error(error);
    }
  }

  // const handleSubscribe = () => {
  //   fetch("http://localhost:3001/session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       items: [
  //         { id: 1, quantity: 3 },
  //         { id: 2, quantity: 1 },
  //       ],
  //     }),
  //   })
  //     .then(res => {
  //       if (res.ok) return res.json()
  //       return res.json().then(json => Promise.reject(json))
  //     })
  //     .then(({ url }) => {
  //       window.location = url
  //     })
  //     .catch(e => {
  //       console.error(e.error)
  //     })
  // }
  

  const handleArticles = async () => {
    
    try {
      const response = await searchArticles();

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const { data } = await response.json();

      const newsData = data.map((news) => ({
        author: news.source,
        title: news.title,
        description: news.description,
        content: news.snippet,
        publishedAt: news.published_at,
        url: news.url,
        urlToImage: news.image_url,
      }));

      setArticles(newsData);
    } catch (err) {
      return console.log(err);
    }
  };
  let count = 0;
  let count2 = 0;
  useEffect(() => {
    handleArticles();
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      
      {articles.map((news, idx) => news.author && news.urlToImage && news.content && news.description && news.title && news.url ?(
        
          <Col key={count++} style={{ padding: "5rem" }}>
            <Card key={count2++}>
              <Card.Img variant="top" src={news.urlToImage} />
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.description}</Card.Text>
                {Auth.loggedIn() ? (
                  <>
                  <Button variant="info"><a href={news.url}>View Article</a></Button>
                  <Button onClick={() => handleFavoriteAricle(news)} variant="info">Save to Favorites</Button>
                  </>
                ):
                (<h5>Login In To View</h5>)}
              </Card.Body>
            </Card>
          </Col>
        ) :
        (<></>))}
    </Row>
  );
};

export default NewsContent;
