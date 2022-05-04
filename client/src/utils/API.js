export const searchArticles = () => {
  return fetch(
    `https://newsapi.org/v2/everything?q=weather&pageSize=10&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`
  );
};
