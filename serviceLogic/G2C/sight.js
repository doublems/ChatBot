//This module is for supporting List of Sight in South Korea. Also all of data from from data.go.kr  operated by Rep Korea Government.
// And this module's is only for delivering Data bettwen DoubleM platform and data.go.kr. like a data transfer module.
//이 모듈은 대한민국 OpenData 플랫폼을 활용하여 제작되었습니다.
//이 모듈은 국가 관광지 데이터를 가져오는 모듈 역활을 할 예정입니다. DTM data transfer module
// ajax 설치 필요. https://www.npmjs.com/package/ajax-request
var request = require('ajax-request');
var express = require('express');
var request = require('request');

function run(ParameterName, ArgumentValue, res) {
    if (ParameterName === "keyword") {
        runByKeyword(ArgumentValue, res);
    }
}

function runByKeyword(keyword, res) {
    var ress = res;
    var totalCountOfSightsinKeyword = 0;
    var sightList = "";
    request(URIMaker(keyword), function (err, res, body) {
        var sightName = JSON.parse(body); //String to JSON Object
        totalCountOfSightsinKeyword = sightName.response.body.totalCount; //키워드 지역의 총 관광지 개수
        //키워드 결과 값이 한가지 일 경우
        if (totalCountOfSightsinKeyword == 1) {
            sightList = {};
            sightList[0] = sightName.response.body.items.item.title; //관광지명
            sightList[1] = sightName.response.body.items.item.addr1; //주소
            sightList[2] = sightName.response.body.items.item.firstimage; //사진
            var returnInfo = sightInfoInJSON(keyword, totalCountOfSightsinKeyword, sightList, 'single');
            return ress.json(returnInfo);
        }
        //키워드 결과 값이 한개 이상일 경우
        else {
            for (i = 0; i < totalCountOfSightsinKeyword; i++) {
                sightList = sightList + sightName.response.body.items.item[i].title + '\n '; //각 검색 결과마다 표기 문자
                //if(i%2==0){NameList+="\n"} //각 검색문자 n개 마다 띄어쓰기 추가
            }
            var returnInfo = sightInfoInJSON(keyword, totalCountOfSightsinKeyword, sightList, 'aNumber');
            return ress.json(returnInfo);
        }
    })
}


//  { "message": { "text":sightInformation, "photo": { "url": "https://photo.src", "width": 640, "height": 480 }, "message_button": { "label": "구글검색으로 더보기", "url": "https://coupon/url" } }, "keyboard": { "type": "buttons", "buttons": [ "리스트보기", "다른지역보기", "취소하기" ] } }


function URIMaker(keyword) {
    eKeyword = encodeURIComponent(keyword); //!!!!!!encodeURIComponent(String val) UTF8형식으로 강릉 -> %EA%B0%95%EB%A6%89 바꿔줌 기본내장함수
    console.log(eKeyword);
    var url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?"
        + "ServiceKey=%2FFgkF%2F%2Fs7zMzruTxgUD41SEGDXlUg3%2FNmsi2xdqwnOjDRcKazh8S0eSMaxTjmp9xfUh1QjXP%2FcsX3OgP%2BQB%2FkA%3D%3D&" +
        "keyword=" + eKeyword + "&contentTypeId=12&arrange=C&listYN=Y&pageNo=1&numOfRows=500&MobileOS=ETC&MobileApp=AppTesting&_type=json"

    return url;
}

function sightInfoInJSON(keyword, count, list, type) {
    if (type == 'aNumber') {
        var message = "안녕하세요. 요청하신 키워드 " + keyword + "의 한국관광공사 데이터 검색 결과입니다.\n" +
            count + "개의 볼거리가 있습니다. 관광지 목록은 다음과 같습니다.\n" + list;
        return sightInformation = {
            "message": {
                "text": message,
                "message_button": {
                    "label": "구글검색으로 더보기",
                    "url": "https://www.google.co.kr/search?q=" + keyword + " 관광지"
                }
            }
        };
    }
    if (type == 'single') {
        if (list[2] == null) {
            list[2] = "http://unsan.nonghyup.com/user/unsan/sopmal/images/goods/thumb/egovtemp_201607271035392700.jpg";
        }
        var message = "안녕하세요. 요청하신 키워드 " + keyword + "의 한국관광공사 데이터 검색 결과입니다.\n" +
            "주소 : " + list[1] + "\n";
        return sightInformation = {
            "message": {
                "text": message,
                "photo": {
                    "url": list[2], "width": 640, "height": 480
                },
                "message_button": {"label": "구글검색으로 더보기", "url": "https://www.google.co.kr/search?q=" + keyword}
            }
        }
    }
    //returnInfo = { "message": { "text":message, "photo": { "url": "https://www.google.co.kr/search?hl=ko&site=imghp&tbm=isch&source=hp&biw=640&bih=480&q"+keyword, "width": 640, "height": 480 }, "message_button": { "label": "구글검색으로 더보기", "url": "https://www.google.co.kr/search?q="+keyword } }};//, "keyboard": { "type": "buttons", "buttons": [ "리스트보기", "다른지역보기", "취소하기" ] } };
}

//네이버로부터 이미지 검색 기능, 추후 별도 모듈로 분리 :17.04.21

/*function IMGfromNaver(keyword) {
 eKeyword = encodeURIComponent(keyword); //!!!!!!encodeURIComponent(String val) UTF8형식으로 강릉 -> %EA%B0%95%EB%A6%89 바꿔줌 기본내장함수
 request({ url: 'https://openapi.naver.com/v1/search/image.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim',
 headers: {
 'X-Naver-Client-Id' :'Z7apZSv5fv6RZduPJ5OU',
 'X-Naver-Client-Secret' : 'M9DdNh5gjY'
 }
 }, function(err, res, body) {
 var test = JSON.parse(body); //String to JSON Object
 console.log(test);
 });
 }*/


function IMGfromNaver(keyword) {
    var img;
    console.log("###Do###");
    var options = {
        url: 'https://openapi.naver.com/v1/search/image.json?query=%EC%A3%BC%EC%8B%9D&display=1&start=1&sort=sim',
        method: 'POST',
        headers: {
            'X-Naver-Client-Id': 'Z7apZSv5fv6RZduPJ5OU',
            'X-Naver-Client-Secret': 'M9DdNh5gjY'
        }

    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log("###Done##");
            console.log(info);
        } else {
            console.log("###Sorry##");
        }
    }

    request(options, callback);
}

module.exports.run = run;
module.exports.runByKeyword = runByKeyword;