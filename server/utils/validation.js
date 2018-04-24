let isValidString = (str)=>{
    return typeof str === 'string' && str.trim().length > 0;
}
let isUserAlreadyInRoom = (users,name,room) =>{
    let user = users.getUserByNameRoom(name,room);
    if(user){
        return true;
    }
    return false;
}

module.exports = {isValidString,isUserAlreadyInRoom}