export const searchArticles = () => {
  return fetch(
    `https://gnews.io/api/v4/search?q=example&token=${process.env.REACT_APP_API_KEY}`
  );
};
