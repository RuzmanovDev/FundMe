
class User {
    constructor(params) {
        this._id = params.id;
        this.username = params.username;
        this.email = params.email;
        this.firstname = ' ';
        this.lastname = ' ';
        this.passHash = params.passHash;
        this.email = params.email;
        this.salt = params.salt;
        this.roles = ['regular'];
    }
    save() { }
    assignRole() { }
    removeRole() { }

    static findOne() { }
    static find() { }

}

module.exports = User;