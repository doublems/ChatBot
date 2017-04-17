//This module is for supporting List of Sight in South Korea. Also all of data from from data.go.kr  operated by Rep Korea Government.
// And this module's is only for delivering Data bettwen DoubleM platform and data.go.kr. like a data transfer module.
//이 모듈은 대한민국 OpenData 플랫폼을 활용하여 제작되었습니다.
//이 모듈은 국가 관광지 데이터를 가져오는 모듈 역활을 할 예정입니다. DTM data transfer module

// ajax 설치 필요. https://www.npmjs.com/package/ajax-request
var request = require('ajax-request');
var express = require('express');

function run(ParameterName, ArgumentValue){
if(ParameterName === "keyword"){
    runByKeyword(ArgumentValue);}
}

function runByKeyword(keyword){
  eKeyword = encodeURIComponent(keyword); //!!!!!!encodeURIComponent(String val) UTF8형식으로 강릉 -> %EA%B0%95%EB%A6%89 바꿔줌 기본내장함수
  console.log(eKeyword);
   url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=%2FFgkF%2F%2Fs7zMzruTxgUD41SEGDXlUg3%2FNmsi2xdqwnOjDRcKazh8S0eSMaxTjmp9xfUh1QjXP%2FcsX3OgP%2BQB%2FkA%3D%3D&keyword="+eKeyword+"&contentTypeId=12&arrange=C&listYN=Y&pageNo=1&numOfRows=10&MobileOS=ETC&MobileApp=AppTesting&_type=json"
  // console.log(url);

   request(url, function(err, res, body) {
       console.log(body);
   });
}
module.exports.run = run;