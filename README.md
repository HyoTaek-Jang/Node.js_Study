# NodeJs 공부일지

### 20년 12월 26일

- 지금까지 들은 강의부분을 스스로 재제작하는 과정
- 배운 거 : 호스팅, query데이터 받기, 폴더읽기, 파일읽기, 템플릿 함수를 활용하여, 필요내용만 바뀌는 html구성.

### 20년 12월 27일

- create 기능 구현
- form을 통해서 데이터 전달, response.on으로 데이터받고, qs.parse로 데이터 변환하고 fileWrite로 생성, 마지막으로 wireHead로 위치 재설정까지
- update 기능 구현
- 인풋 히든으로 폼에서 타이틀 값 가져오고 create와 동일한 방법으로 파일 생성.but 파일 이름이 같기에 업데이트가 됐다.

### 20년 12월 28일

- del 기능 구현
- fs.unlink로 삭제, 폼 정보를 받아서 parse하는거 스트링으로 넘겨줘야함.
- 함수도 변수임 변수가 모여서 객체 객체가 모여서 모듈
- 모듈 사용법.
- 위험한 코드를 막아주는 sanitize. ex) sanitize-html;
