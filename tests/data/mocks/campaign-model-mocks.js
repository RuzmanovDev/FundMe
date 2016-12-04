class Campaign {
    constructor(params) {
        this.id = params._id;
        this.title = params.title;
        this.description = params.description;
        this.createdOn = params.createdOn;
        this.comments = [];
        this.creator = params.creator;
        this.upVotes = 0;
        this.category = params.category;
        this.image = params.image;
        this.target = params.target;
        this.funded = 0;
    }

    static find() { }
}


module.exports = Campaign;

