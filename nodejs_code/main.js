var http = require("http");
var fs = require("fs");
var url = require("url"); // 괄호안에 있는건 모듈. 즉, url 이라는 모듈을 요구한다.
var app = http.createServer(function (request, response) {
  var _url = request.url; // URL에서 쿼리스트링을 의미함 ex) /?id=HTML
  var queryData = url.parse(_url, true).query; // url을 분석해서 쿼리스트링을 받아옴.
  var title = queryData.id;

  if (_url == "/") {
    //루트 ex)  localhost:3000 가 루트임.
    title = `Welcome`;
  }
  if (_url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }

  if (url.parse(_url, true).pathname === "/") {
    if (queryData.id === undefined) {
      var description = "Hello, Node";

      //   if (err) throw err;

      var template = `<!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>
              ${description}
            </p>
          </body>
          </html>
          `;
      response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
      response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", (err, data) => {
        //   if (err) throw err;

        var template = `<!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>
              ${data}
            </p>
          </body>
          </html>
          `;
        response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
        response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
      });
    }
  } else {
    response.writeHead(404); // 정상적으로 파일이 전송됐다는 뜻.
    response.end("Not Found"); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
  }
});
app.listen(3000);

/*
웹서버 구축
아직 코드를 이해하지 못하지만, 저 main.js를 실행하면 로컬호스팅이 된다.
*/
