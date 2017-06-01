//import area
//import {test}from './serviceLogic/G2C/test'

const myModule = require('./serviceLogic/G2C/test');
const sight = require('./serviceLogic/G2C/sight');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var promise = require('promise');
var asy = require('async');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/22', function (req, res) {
  sight.run("keyword","강릉");
  res.send('22호출됨!');
});

app.get('/keyboard', function (req, res) {
       console.log( "키보드불림" );
        //  res.json( { "type" : "buttons", "buttons" : ["선택 1ㅋ", "선택 2ㅋ", "선택 3ㅋ"] } ); //버튼타입
        res.json( { "type" : "text" } );
})

// 나 : user_key: 'f3ro6uOU5lfK' 망고 : user_key: 'P4KzD3k0nKUF'

app.post('/message', function (req, res, next) {
  console.log( "메세지불림" );
 //  var userKey = req.body;
//   var content = req.param("content");
    var msg = "";
    if(req.body.user_key === "P4KzD3k0nKUF"){msg = "우리망고 헬로우~!"}
    if(req.body.user_key === "f3ro6uOU5lfK"){msg = "제작자님 헬로우~!"}

  sight.run("keyword",req.body.content,res);


});


app.post('/friend', function (req, res, next) {
  console.log( "친구추가" );
 //  var userKey = req.body;
//   var content = req.param("content");
   console.log(req.body);
   res.json({ "message":{ "text" : "어서오세요!ㅎㅎ" }});
})

app.delete('/friend/*', function (req, res, next) {
  console.log( "친구삭제" );
 //  var userKey = req.body;
//   var content = req.param("content");
   console.log(req.body);
   res.json({ "message":{ "text" : "안녕히가세요" }});
})

app.delete('/chat_room/*', function (req, res, next) {
  console.log( "채팅방나가기" );
 //  var userKey = req.body;
//   var content = req.param("content");
   console.log(req.body);
   res.json({ "message":{ "text" : "안녕히가세요" }});
})

//오류처리
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//서버시작
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
