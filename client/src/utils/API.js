export const searchArticles = (page) => {
  return fetch(
    `https://newsapi.org/v2/everything?pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`
  );
};
