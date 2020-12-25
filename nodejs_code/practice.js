var http = require("http");
var fs = require("fs");

//이 서버에 오는 http요청마다 이 함수가 호출됨.
var app = http.createServer(function (request, response) {
  var url = request.url;
  console.log(url);
  if (request.url == "/") {
    url = "/index.html";
  }
  if (request.url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  console.log(__dirname);
  // 현재 폴더위지
  response.end(fs.readFileSync(`.${url}`));
  // 화면 출력
});
app.listen(1500);
