//모듈 로드
var client = require('cheerio-httpcli');
var urlType = require('url');

// 다운로드
var url = 'https://ko.wikipedia.org/wiki/'+encodeURIComponent('개'); //  , / ? : @ & = + $ # 문자들을 주소창 형식에 맞게 변환.
var param = {};

client.fetch(url, param, function(err, $, res) {
    if(err) {
        console.log('error~~!!');
        return;
    }

    // 이미지만 추출
    $('img').each(function(idx) {
        var src = $(this).attr('src'); // 속성이 src 인것만
        src = urlType.resolve(url, src); // 상대주소를 전체 경로로 변환
        console.log(src);
    });
});