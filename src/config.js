(() => {
  module.exports = {
    apiUrl: process.env.API_URL || "http://localhost:3000/",
    port: process.env.PORT || 3000
  };
})();
