const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http  = require('http');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage,generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
// console.log(publicPath);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    }); 
    socket.emit('newMessage',generateMessage('admin','welcome to chat app'))
    socket.broadcast.emit('newMessage',generateMessage('admin','new user has join the chat room'))
    socket.on('createMessage',(data,callback)=>{
        console.log('create message ',data);
        
        io.emit('newMessage',generateMessage(data.from,data.text))
        callback('callback data');
       
    });
    socket.on('createLocation',(cords)=>{
       console.log(cords)
        io.emit('newLocationMessage',generateLocationMessage('admin',cords.latitude,cords.longitude))
    })
})
server.listen(port,()=>{
    console.log(`server is listening on port number ${port}`)
})