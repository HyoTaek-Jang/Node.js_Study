var name = "Taek";
var letter =
  "Eiusmod " +
  name +
  " ipsum et sint aliq\n\
\
ua " +
  name +
  "nostrud Eu do Lorem est in tempor amet velit tempor anim exercitation sunt ut nisi. Amet labore cupidatat sint Lorem elit excepteur nostrud laboris magna. Tempor duis nisi nisi tempor adipisicing consectetur aliqua ea sint.in dolor eiusmod id ut aliqua sit non.";
console.log(letter);

var args = process.argv;
//인풋 받기. ex) node syntax\Variable2.js blahblah. 일단 process.argv는 배열로 값을 받는데 이러면 블라블라는 3번째 배열부터 들어감.

if (args[2] == 1) {
  // 1도되고 '1'도 된다. 형변환이 되나..? ㅇㅎ ===은 안되네

  console.log("it is number1");
} else if (args[3] == 1) {
  console.log("두번째 숫자가 1이다");
} else console.log("1없다.");
