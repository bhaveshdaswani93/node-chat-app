const expect  = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    let users = new Users();
    beforeEach(()=>{
        users.users = [{
            id:'1',
            name:'jay',
            room:'node learn'
        },{
            id:'2',
            name:'dhaval',
            room:'react learn'
        },{
            id:'3',
            name:'umang',
            room:'node learn'
        }]
    })
    it('it should add user to array',()=>{
        let users = new Users();
        let user = {
            id:'123',
            name:'bhavesh',
            room:'Hello world'
        }
        users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);

    });
    it('should delete user',()=>{
        let removeUser = users.removeUser(users.users[1].id)
        // expect(removeUser).toEqual(users.users[1]);
        expect(users.users.length).toBe(2);
        expect(users.users).not.toEqual(expect.arrayContaining([removeUser]));

    });
    it('should get user',()=>{
        let user = users.getUser(users.users[0].id);
        expect(user).toEqual(users.users[0]);
    })
    it('should contain name array',()=>{
        let nameArray = users.getUserList(users.users[1].room);
        expect(nameArray.length).toBe(1);
        expect(nameArray[0]).toBe(users.users[1].name);
    })
    it('should find user by name and room',()=>{
        let user = users.getUserByNameRoom(users.users[0].name,users.users[0].room)
        expect(user).toBeTruthy();
    })
    it('should get room list',()=>{
        let roomList = users.getRoomList();
        expect(roomList.length).toBe(2);

    })
})