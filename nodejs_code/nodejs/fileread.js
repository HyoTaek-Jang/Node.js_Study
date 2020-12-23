var fs = require("fs");
fs.readFile("sample.txt", "utf8", (err, data) => {
  //   if (err) throw err;
  console.log(data);
});

// 여기서 실행을 하더라도 노드가 어디서 실행되느냐에 따라 smaple.txt를 찾음
