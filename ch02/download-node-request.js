// nodejs 모듈 로드
var request = require('request');
var fs = require('fs');// nodeJS 의 FileSystem 모듈 로드.

// url 지정
var url = "http://jpub.tistory.com";
var savepath = "test.html"; // 저장될 이름.

// 다운로드
request(url).pipe(fs.createWriteStream(savepath));  // 해당 url의 내용을 저장.