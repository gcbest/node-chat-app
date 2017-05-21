class Users {
    constructor() {
        this.usersArr = [];
    }

    addUser(id, name, room) {
        var user = {id:id, name:name, room:room};
        this.usersArr.push(user);
        return user;
    }

    removeUser(id) {
        var removedUser = this.getUser(id);

        if (removedUser) {
            this.usersArr = this.usersArr.filter((user) => user.id !== id);
        }

        return removedUser;
    }

    getUser(id) {
        return this.usersArr.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.usersArr.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = Users;