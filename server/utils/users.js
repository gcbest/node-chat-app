class Users {
    constructor() {
        this.usersArr = [];

    }

    addUser(id, name, room) {
        var user = {id:id, name:name, room:room};
        this.usersArr.push(user);
        return user;
    }
}

module.exports = Users;