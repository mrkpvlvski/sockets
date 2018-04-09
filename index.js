//NodeJS
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var path=require('path')


app.get('/', function(req,res){
  res.sendFile(__dirname + '/image.html')
})


io.on('connection', function(socket){
  socket.on('ready message', function(){
    console.log('received ready message');
  });
  // fs.readFile(path.resolve(__dirname, './image.jpg'), function(err, data){
  //   socket.emit('imageConversionByClient', { image: true, buffer: data })
  //   socket.emit('imageConversionByServer', "data:image/png;base64,"+ data.toString("base64"))
  // })
  sendImage(socket)
})

function sendImage(socket){
  fs.readFile(path.resolve(__dirname, './image.jpg'), function(err, data){
    socket.emit('imageConversionByClient', { image: true, buffer: data })
    socket.emit('imageConversionByServer', "data:image/png;base64,"+ data.toString("base64"))
  })
}



http.listen(3000, function(){
  console.log('listening on *:3000');
});
