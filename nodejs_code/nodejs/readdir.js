var testFolder = `./data/`; //파일의 위치 기반이 아닌. 이 노드 파일을 실행할때 그 현재 디렉토리를 기준으로 위치를 잡아줘야함
var fs = require("fs");

fs.readdir(testFolder, function (err, filelist) {
  console.log(filelist); // 배열로 파일목록을 전달함.
});
