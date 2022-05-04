export const searchArticles = () => {
  return fetch(
    `https://api.thenewsapi.com/v1/news/top?api_token=${process.env.REACT_APP_API_KEY}`
  );
};
