export const searchArticles = () => {
  return fetch(
    `https://newsapi.org/v2/everything?q=weather&pageSize=10&sortBy=publishedAt&apiKey=f1bd9668405e4da088e05fa0a7e8f2a9`
  );
};
