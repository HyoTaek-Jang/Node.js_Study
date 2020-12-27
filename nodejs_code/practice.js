const http = require("http");
const fs = require("fs");
const url = require("url");
var qs = require("querystring");

function template(title, content, list) {
  return `<!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <h3><a href="/create">create</a></h3>
      <h2>${title}</h2>

      <p>
      ${content}  
      </p>
    </body>
    </html>
    `;
}

//이 서버에 오는 http요청마다 이 함수가 호출됨.
const app = http.createServer((request, response) => {
  let _url = request.url;
  //title 제작
  let title = url.parse(_url, true).query.title;
  //title 제작끝
  console.log(title);
  console.log(_url);

  //list 제작
  let list = ``;
  const files = fs.readdirSync("./data");
  list += `<ol>`;
  for (file in files) {
    list += `<li><a href="/?title=${files[file]}">${files[file]}</a></li>`;
  }
  list += `</ol>`;
  //list 제작끝
  if (request.url == "/") {
    response.writeHead(200);
    // 정상적인 파일 전송
    response.end(template("Web", "welcome node js", list));
  } else if (title != undefined) {
    fs.readFile(`./data/${title}`, "utf8", (err, data) => {
      response.writeHead(200);
      response.end(template(title, data, list));
    });
    // 화면 출력
  } else if (_url === "/create") {
    response.writeHead(200);
    response.end(
      template(
        "Create",
        `    <form action="http://localhost:1500/process_create" method="post"> 
   <input name="title" type="text" placeholder="파일명을 입력해주세요" style="display: block;">
   <textarea name="description" id="" cols="30" rows="10" placeholder="내용을 입력해주세요."></textarea>
   <input type="submit" value="submit">
</form>`,
        list
      )
    );
  } else if (_url === "/process_create") {
    let body = ``;
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;

      fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
        response.writeHead(302, { Location: `/?title=${title}` });
        response.end("complete create");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
  console.log(__dirname);
  // 현재 폴더위지
});
app.listen(1500);

/*
ver1.00 201226 : 단순 화면 띄우기
ver1.01 201226 : html을 바꾸는 것이 아닌. 화면 단은 냅두고, 아래 컨텐츠 부문만 txt로 불러와서 바꾸기.

-크리에이트 기능 구현해야함

*/
