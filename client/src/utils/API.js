import dotenv from "dotenv";

dotenv.config();

export const searchArticles = (query, page) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${proccess.env.REACT_APP_API_KEY}`
  );
};
