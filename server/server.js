const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http  = require('http');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage,generateLocationMessage} = require('./utils/message')
const {isValidString,isUserAlreadyInRoom}  = require('./utils/validation');
const {Users} = require('./utils/users');
const users = new Users();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
// console.log(publicPath);
app.use(express.static(publicPath));

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    let roomList = users.getRoomList();
    res.render(`${publicPath}/index.ejs`,{roomList});
})
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        // console.log('user disconnected');
        let user = users.removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('userslist',users.getUserList(user.room));
        }
        
    }); 
    
    // socket.broadcast.emit('newMessage',generateMessage('admin','new user has join the chat room'))
    socket.on('createMessage',(data,callback)=>{
        console.log('create message ',data);
        let user = users.getUser(socket.id);
        if(user && isValidString(data.text) ) {
            io.to(user.room).emit('newMessage',generateMessage(user.name,data.text))
        }
        
        callback('callback data');
       
    });
    socket.on('createLocation',(cords)=>{
       console.log(cords)
       let user  = users.getUser(socket.id);
       if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,cords.latitude,cords.longitude))
       }
        
    })
    socket.on('join_room',(data,callback)=>{
        data.room = (data.room_select.trim() !='' )?data.room_select:data.room;
       data.room = data.room.toLowerCase();
        if(!isValidString(data.name) || !isValidString(data.room) ) {
           return  callback('Name or room are required')
        }
        if(isUserAlreadyInRoom(users,data.name,data.room)){
            return callback('This name is already taken');
        }
        users.removeUser(socket.id);
        users.addUser(socket.id,data.name,data.room)
        socket.join(data.room.toLowerCase());
        socket.emit('newMessage',generateMessage('admin','welcome to chat app'))    
        console.log('all user',users.users)
        console.log('user_chat',users.getUserList(data.room))
        // io.to().emit
        io.to(data.room).emit('userslist',users.getUserList(data.room))

        socket.broadcast.to(data.room).emit('newMessage',generateMessage('admin',`${data.name} has join the chat room`))
        callback();
    })
})
server.listen(port,()=>{
    console.log(`server is listening on port number ${port}`)
})