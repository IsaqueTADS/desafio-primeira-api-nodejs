const http = require("node:http");

const server = http.createServer((req, res) => {
  res.write("hello world");
  res.end();
});

server.listen(3333, () => {
  console.log("HTTP server running!");
});
