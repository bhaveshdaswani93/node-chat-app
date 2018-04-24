class Users
{
    constructor () {
        this.users = [];
    }

    addUser(id,name,room) {
        let user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let userDel;
        let users = this.users.filter((user,index)=>{
            if(user.id===id) {
                userDel = user;
                this.users.splice(index,1);
            }
            return user.id === id;
        });
      return userDel;
    }
    getUser(id) {
        let users = this.users.filter((user)=>user.id===id);
        return users[0];
    }
    getUserList(room) {
        let users = this.users.filter((user)=>user.room ===room);
        let nameArray = users.map((user)=>{
            return user.name;
        })
        return nameArray;
    }
    getUserByNameRoom(name,room) {
        let users = this.users.filter((user)=>{
           return user.name.toLowerCase() === name.toLowerCase() && user.room.toLowerCase() === room.toLowerCase()
        });
        return users[0];
    }
    getRoomList() {
        let rooms = []
        this.users.forEach((user)=>{
            if(!rooms.includes(user.room)){
                rooms.push(user.room);
            }
        })
        return rooms;
    }

}

module.exports = {Users};