//This module is for supporting List of Sight in South Korea. Also all of data from from data.go.kr  operated by Rep Korea Government.
// And this module's is only for delivering Data bettwen DoubleM platform and data.go.kr. like a data transfer module.
//이 모듈은 대한민국 OpenData 플랫폼을 활용하여 제작되었습니다.
//이 모듈은 국가 관광지 데이터를 가져오는 모듈 역활을 할 예정입니다. DTM data transfer module
//todo 170419 : 경복궁치면 에러 나는 문제 해결
// ajax 설치 필요. https://www.npmjs.com/package/ajax-request
var request = require('ajax-request');
var express = require('express');


function run(ParameterName, ArgumentValue, res){
if(ParameterName === "keyword"){
    runByKeyword(ArgumentValue,res);}
}

function runByKeyword(keyword,res){
   var ress = res;
   var totalCountOfSightsinKeyword = 0;
   var NameList="";
   var returnInfo = "";
    request(URIMaker(keyword), function(err, res, body) {
            var sightName = JSON.parse(body); //String to JSON Object
            totalCountOfSightsinKeyword = sightName.response.body.totalCount; //키워드 지역의 총 관광지 개수 
            
            for(i=0;i<totalCountOfSightsinKeyword&&i<10;i++){NameList = NameList +sightName.response.body.items.item[i].title+' / '};
            console.log(totalCountOfSightsinKeyword);
            var message = TextMaker(keyword,totalCountOfSightsinKeyword,NameList);
            returnInfo = { "message": { "text":message, "photo": { "url": "https://photo.src", "width": 640, "height": 480 }, "message_button": { "label": "구글검색으로 더보기", "url": "https://coupon/url" } }};//, "keyboard": { "type": "buttons", "buttons": [ "리스트보기", "다른지역보기", "취소하기" ] } };
       console.log("111");
       console.log(totalCountOfSightsinKeyword);   
       console.log("222");
       console.log(returnInfo);
       return ress.json(returnInfo);
       //return returnInfo;
       })
};
   

 //  { "message": { "text":sightInformation, "photo": { "url": "https://photo.src", "width": 640, "height": 480 }, "message_button": { "label": "구글검색으로 더보기", "url": "https://coupon/url" } }, "keyboard": { "type": "buttons", "buttons": [ "리스트보기", "다른지역보기", "취소하기" ] } }


function URIMaker(keyword){
     eKeyword = encodeURIComponent(keyword); //!!!!!!encodeURIComponent(String val) UTF8형식으로 강릉 -> %EA%B0%95%EB%A6%89 바꿔줌 기본내장함수
   console.log(eKeyword);
   var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?"
   +"ServiceKey=%2FFgkF%2F%2Fs7zMzruTxgUD41SEGDXlUg3%2FNmsi2xdqwnOjDRcKazh8S0eSMaxTjmp9xfUh1QjXP%2FcsX3OgP%2BQB%2FkA%3D%3D&"+
   "keyword="+eKeyword+"&contentTypeId=12&arrange=C&listYN=Y&pageNo=1&numOfRows=100&MobileOS=ETC&MobileApp=AppTesting&_type=json"

    return url;
}

function TextMaker(keyword, count, list) {
    var sightInformation = "안녕하세요. 요청하신 키워드 "+keyword+"의 검색결과입니다. " +
    count+"개의 볼거리가 있습니다. 관광지 목록은 다음과 같습니다. "+list;
    
    return sightInformation;
}

module.exports.run = run;
module.exports.runByKeyword = runByKeyword;