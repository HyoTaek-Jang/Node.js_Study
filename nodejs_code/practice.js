const http = require("http");
const fs = require("fs");
const url = require("url");
var qs = require("querystring");
const template = require("./lib/template");
// 얘네 각각이 모듈임. 우리가 모듈 사용할 때, 맨 마지막에 module.export = ~ ;로 할 수 있음.

//이 서버에 오는 http요청마다 이 함수가 호출됨.
const app = http.createServer((request, response) => {
  let _url = request.url;
  //title 제작
  let title = url.parse(_url, true).query.title;
  let urlInfo = url.parse(_url, true);

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
    response.end(template.HTML("Web", "welcome node js", list));
  } else if (title != undefined) {
    fs.readFile(`./data/${title}`, "utf8", (err, data) => {
      response.writeHead(200);
      response.end(template.File(title, data, list));
    });
    // 화면 출력
  } else if (_url === "/create") {
    response.writeHead(200);
    response.end(
      template.HTML(
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
  } else if (urlInfo.pathname === "/update/") {
    fs.readFile(`./data/${urlInfo.query.id}`, "utf8", (err, data) => {
      response.writeHead(200);
      response.end(
        template.File(
          `Update - ${urlInfo.query.id}`,
          `    <form action="http://localhost:1500/update_create" method="post">
         <input name="title"value="${urlInfo.query.id}" type="hidden">
   <textarea name="description" id="" cols="30" rows="10" >${data}</textarea>
   <input type="submit" value="submit">
  </form>`,
          list
        )
      );
    });
  } else if (_url === `/update_create`) {
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
        response.end("complete update");
      });
    });
  } else if (_url === `/delete_process`) {
    request.on("data", (data) => {
      request.on("end", (err) => {
        const title = qs.parse(`${data}`).title;
        console.log(title);
        fs.unlink(`./data/${title}`, (err) => {
          response.writeHead(302, { Location: `/` });
          response.end("complete update");
        });
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
