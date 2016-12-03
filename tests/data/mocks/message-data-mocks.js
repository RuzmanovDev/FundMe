class Message {
    constructor(params) {
        this.firstUser = params.firstUser;
        this.secondUser = params.secondUser;
        this.texts = params.texts;
        this.identification = params.identification;
    }

    static find() { }
    static findOne() { }
}

module.exports = Message;