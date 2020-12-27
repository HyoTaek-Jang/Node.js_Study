var http = require("http");
var fs = require("fs");
var url = require("url"); // 괄호안에 있는건 모듈. 즉, url 이라는 모듈을 요구한다.
var qs = require("querystring");

function templateHTML(title, list, body, control) {
  return `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = "<ol>";
  for (var i = 0; i < filelist.length; i++) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list += "</ol>";
  return list;
}

var app = http.createServer(function (request, response) {
  //createServer는 노드제이로 웹브러우저가 접속이 들어올때마다 호출. 콜백의 1번 파라미터는 : 요청할때 웹브라우저가 보내는거, 리스폰스는 응답할때 우리가 웹에 전송하는 정보들
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
      fs.readdir("./data", function (err, filelist) {
        var description = "Hello, Node";
        var list = templateList(filelist);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>
        <p>
          ${description}
        </p>`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
        response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        var list = templateList(filelist);

        fs.readFile(`./data/${title}`, "utf8", (err, data) => {
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>
          <p>
            ${data}
          </p>`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
          response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
        });
      });
    }
  } else if (url.parse(_url, true).pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var description = "WEB-Create";
      var list = templateList(filelist);
      var template = templateHTML(
        title,
        list,
        `<h2>Create</h2>
      <p>
      <form action="http://localhost:3000/create_process" method="post"> 
      <!--메소드 호스트를 하면 유알엘에 쿼리스트링이 등장하지 않음.  -->
     <!-- 입력값을 저 주소로 보내고싶다 라는 뜻 -->
     <input name="title" type="text" placeholder="입력해라" style="display: block;">
     <textarea name="description" id="" cols="30" rows="10"></textarea>
     <input type="submit" value="submit">
 </form>
      </p>`,
        ""
      );
      response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
      response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
    });
  } else if (url.parse(_url, true).pathname === "/create_process") {
    let body = "";
    request.on("data", function (data) {
      //포스트로 전송할때 한번에 데이터가 많이오면 다운됨. 만약 데이터 많을때, 이걸사용함. 데이터가 조각조각 들어올때 이게 호출됨. 데이터로 인자를 전달함.
      body += data;
    });
    request.on("end", function () {
      let post = qs.parse(body); //정보를 객체로 받음.
      console.log(post);
      let title = post.title;
      let description = post.description;
      fs.writeFile(
        `data/${title}`,
        description,
        "utf8",
        (err) => {
          response.writeHead(302, { Location: `/?id=${title}` }); // 다른 페이지로 redirection.
          response.end(); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
        }
        //파일 만들고 그 페이지로 이동하고싶다 -> redirection 이라는 것.
      );
      console.log(post, title, description);
      // post데이터에 포스트정보 즉 바디가 들어있을 것이다.
    });
  } else if (url.parse(_url, true).pathname === "/update") {
    fs.readdir("./data", function (err, filelist) {
      var list = templateList(filelist);

      fs.readFile(`./data/${title}`, "utf8", (err, data) => {
        var template = templateHTML(
          title,
          list,
          `
          <form action="/update_process" method="post"> 
          <!--메소드 호스트를 하면 유알엘에 쿼리스트링이 등장하지 않음.  -->
         <!-- 입력값을 저 주소로 보내고싶다 라는 뜻 -->
         <input name="id"value="${title}" type="hidden">
          
         <input name="title"value="${title}" type="text" placeholder="입력해라" style="display: block; ">
         <textarea name="description" id="" cols="30" rows="10">${data}</textarea>
         <input type="submit" value="submit">
     </form>
          
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200); // 정상적으로 파일이 전송됐다는 뜻.
        response.end(template); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
      });
    });
  } else if (url.parse(_url, true).pathname === "/update_process") {
    let body = "";
    request.on("data", function (data) {
      //포스트로 전송할때 한번에 데이터가 많이오면 다운됨. 만약 데이터 많을때, 이걸사용함. 데이터가 조각조각 들어올때 이게 호출됨. 데이터로 인자를 전달함.
      body += data;
    });
    request.on("end", function () {
      let post = qs.parse(body); //정보를 객체로 받음.
      let title = post.id;
      let description = post.description;

      fs.writeFile(
        `data/${title}`,
        description,
        "utf8",
        (err) => {
          if (title != post.title) {
            fs.rename(`data/${title}`, `data/${post.title}`, (err) => {});
          }
          response.writeHead(302, { Location: `/?id=${post.title}` }); // 다른 페이지로 redirection.
          response.end(); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
        }
        //파일 만들고 그 페이지로 이동하고싶다 -> redirection 이라는 것.
      );
      console.log(post, title, description);
      // post데이터에 포스트정보 즉 바디가 들어있을 것이다.
    });
  } else {
    response.writeHead(404); // 정상적으로 파일이 전송됐다는 뜻.
    response.end("Not Found.."); //사용자가 접속한 url에서 파일을 읽어주는 코드. 받아온 쿼리데이터로 파일을 읽으려 시도함
  }
});
app.listen(3000);

/*
웹서버 구축
아직 코드를 이해하지 못하지만, 저 main.js를 실행하면 로컬호스팅이 된다.
*/
