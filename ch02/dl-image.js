// nodejs 모듈 로드
var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs'); // nodejs 내장 모듈
var urlType = require('url');   // nodejs 내장 모듈

// 저장할 디렉토리가 없으면 생성.
var saveDir = __dirname+"/img"; // 스크립트실행 디렉토리(__dirname)에 img 폴더 생성.
if(!fs.existsSync(saveDir)) {   // 폴더가 존재하지 않는다면,
    fs.mkdirSync(saveDir);  // 폴더를 생성한다. 
    //mkdir()메서드는 비동기(async)로 동작하고, mkdirSync()메서드는 동기로 동작하게 된다.
}

// url지정
var url = "http://ko.wikipedia.org/wiki/"+encodeURIComponent("개");
var param = {};

// html 파일 분석 및 다운로드
client.fetch(url, param, function(err, $, res) {
    if(err) {
        console.log("error!!!!");
        return;
    }

    // 해당 페이지에서 img 태그의 내용만 추출
    $("img").each(function(idx) {
        var src = $(this).attr('src');  // 배열의 현재값의 속성중 src 속성의 값만 추출
        src = urlType.resolve(url, src);    // 사이트url을 기준으로 src속성의 값을 합쳐서 절대 경로로 변환.

        var fname = urlType.parse(src).pathname;    // string 값을 URL object로 변환(parse)한 후 url을 제거한 경로명만을 추출.
        console.log(fname);
        fname = saveDir+"/"+fname.replace(/[^a-zA-Z0-9\.]+/g, "_"); // 문자(a-zA-Z)나 숫자(0-9)가 아닌(^) 값을 특정문자열(_)로 변환. 

        // 다운로드
        request(src).pipe(fs.createWriteStream(fname));
    });
});