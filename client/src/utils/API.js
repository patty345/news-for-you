export const searchArticles = (page) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=weather&pageSize=10&page=1&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`
  );
};
