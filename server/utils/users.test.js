const expect = require('expect');

const Users = require('./users');

describe('Users', function() {
    var users;

    users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
    }, {
        id: '2',
        name: 'Fonzo',
        room: 'React Course'
    }, {
        id: '3',
        name: 'Zion',
        room: 'Node Course'
    }];

   it('should add new user', function () {
        var testUsers = new User();
        var user = {
            id: '123',
            name: 'Umberto',
            room: 'Giants fans'
        };
    var resUser = testUsers.addUser(user.id, user.name, user.room);

    expect(testUsers.usersArr).toEqual([user]);

    });

   it('should remove a user', function() {
       var userId = '1';
       var user = users.removeUser(userId);

       expect(user.id).toBe(userId);
       expect(users.users.length).toBe(2);

   });

    it('should not remove a user', function() {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user.id).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', function() {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', function() {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user.id).toNotExist();

    });


   it('should return names for node course', function () {
      var userList = users.getUserList('Node Course');

      expect(userList).toEqual(['Mike', 'Zion']);
   });


});