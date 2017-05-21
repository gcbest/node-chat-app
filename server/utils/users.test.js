const expect = require('expect');

const Users = require('./users');

describe('Users', () => {
   it('should add new user', () => {
        var testUsers = new User();
        var user = {
            id: '123',
            name: 'Umberto',
            room: 'Giants fans'
        };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(testUsers.usersArr).toEqual([user]);

    });


});