const api = {
  baseUrl: 'http://localhost:3000',
  home: {
    content: 'https://api.jsonbin.io/b/5b82d040ab9a186eafe0b1bf/1',
    latest_news: 'https://api.jsonbin.io/b/5b8b8c6bdb948c68635b4245/9',
    popular_news: 'https://api.jsonbin.io/b/5b8be84a3ffac56f4bd8e1e4/3'
  },
  category: {
    content: 'https://api.jsonbin.io/b/5b9603d7ab9a186eafe7f8ab/4',
    latest_news: 'https://api.jsonbin.io/b/5b93c87a3ffac56f4bdb7170/2',
    popular_news: 'https://api.jsonbin.io/b/5b8be84a3ffac56f4bd8e1e4/3'
  },
  news_detail: {
    content: 'https://api.jsonbin.io/b/5b8fddc83ffac56f4bda6cdb/6'
  },
  profile: {
    content: 'https://api.jsonbin.io/b/5b97a3b6d6fe677c48d8a264/3',
    articles: 'https://api.jsonbin.io/b/5b9cfd2e0fbf2833e2259ac3/1',
    applause: 'https://api.jsonbin.io/b/5b9d128a1bf1ca33b06b6e32',
    following: 'https://api.jsonbin.io/b/5b9cfd2e0fbf2833e2259ac3/1',
    followers: 'https://api.jsonbin.io/b/5b9d128a1bf1ca33b06b6e32'
  },
  header: {
    content: 'https://jsonplaceholder.typicode.com/users'
  }
};

export default api;
