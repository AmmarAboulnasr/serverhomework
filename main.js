'use strict';

var http = require('http');
var md5 = require('md5');

var server = http.createServer(function(req, res) {
  var request = req.url.split('/');
  switch(request[1]) {
    case "math" :
    switch(request[2]) {
      case "add" :
      var total = 0;
      for(var i = 3; i < request.length; i++) {
        total += Number(request[i]);
      }
      res.write(`Addition Total: ${total}\n`);
      break;
      case "sub" :
      var total = 0;
      for(var i = 3; i < request.length; i++) {
        total -= Number(request[i]);
      }
      res.write(`Subtraction Total: ${total}\n`);
      break;
      case "mul" :
      var total = 1;
      for(var i = 3; i < request.length; i++) {
        total *= Number(request[i]);
      }
      res.write(`Multiplication Total: ${total}\n`);
      break;
      case "div" :
      var total = request[3];
      for(var i = 4; i < request.length; i++) {
        total /= Number(request[i]);
      }
      res.write(`division Total: ${total}\n`);
      break;
      case "square" :
      res.write(`Squared: ${request[3]*request[3]}\n`);
      break;
      case "cube" :
      res.write(`Cubed: ${request[3]*request[3]*request[3]}\n`);
      break;
      default: res.write("Function not found.\n");
    }
    break;
    case "gravatar" :
    var md5Result = md5(request[2]);
    res.write(`Gravatar URL: http:\/\/www.gravatar.com/avatar/${md5Result}\n`);
    break;
    case "sentence" :
    var str = decodeURI(request[2]);
    var words = str.split(" ");
    var strNoSpaces = "";
    words.forEach(function(word) {
      strNoSpaces += word;
    });
    var letters = strNoSpaces.length;
    var sentenceInfo = {
      letters: letters,
      spaces: words.length-1,
      words: words.length
    };
    res.write(`${JSON.stringify(sentenceInfo)}\n`);
    break;
    default: res.write("Function not found.\n");
  }
  res.end();
});

server.listen(3000);