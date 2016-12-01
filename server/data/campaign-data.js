/*globals */

module.exports = function (models) {
    let Campaign = models.Campaign;
    return {
        getUserCampaigns(userId) {
            return new Promise((resolve, reject) => {
                Campaign.find({ 'creator.id': userId }, (err, campaigns) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(campaigns);
                    }

                });
            });
        },
        filterCampaigns(filter) {
            return new Promise((resolve, reject) => {
                Campaign.find({ filter }, (err, campaigns) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(campaigns);
                    }
                });
            });
        },
        getAllCampaigns(pageNumber, pageSize) {
            return new Promise((resolve, reject) => {
                var query = Campaign.find({})
                    .skip(pageNumber * pageSize)
                    .limit(pageSize);

                resolve(query);
            });
        },
        findCampaignsByCategory(category, pageNumber, pageSize) {
            return new Promise((resolve, reject) => {
                var query = Campaign.find({ category })
                    .skip(pageNumber * pageSize)
                    .limit(pageSize);

                resolve(query);
            });
        },
        getCampaignById(id) {
            return new Promise((resolve, reject) => {
                Campaign.findOne({ _id: id }, (err, campaign) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(campaign);
                });
            });
        },
        createCampaign(campaign) {
            let camp = new Campaign({
                title: campaign.title,
                description: campaign.description,
                createdOn: campaign.createdOn,
                comments: campaign.comments,
                creator: {
                    id: campaign.creator.id,
                    username: campaign.creator.username
                },
                donators: campaign.donators,
                upVotes: campaign.upVotes,
                target: campaign.target,
                funded: campaign.funded,
                image: campaign.image,
                category: campaign.category
            });

            return new Promise((resolve, reject) => {
                camp.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(camp);
                });
            });

        },
        fundCampaign(id, value) {
            return this.getCampaignById(id)
                .then((campaign) => {
                    campaign.funded += value;
                    campaign.save();
                });
        },
        voteCampaign(id, userLikedCampaign) {
            return this.getCampaignById(id)
                .then((campaign) => {
                    if (campaign.likedBy.indexOf(userLikedCampaign) < 0) {
                        campaign.upVotes += 1;
                        campaign.likedBy.push(userLikedCampaign);
                    } else {
                        campaign.upVotes -= 1;
                        let indexOfUser = campaign.likedBy.indexOf(userLikedCampaign);
                        campaign.likedBy.splice(indexOfUser, 1);
                    }
                    campaign.save();
                });
        },
        createComment(comment) {
            return this.getCampaignById(comment.campaignId)
                .then((campaign) => {
                    let commentContent = comment.content;
                    let commentAuthor = comment.author;
                    let newComment = { commentContent, commentAuthor };
                    campaign.comments.push(newComment);
                    campaign.save();
                });
        },
        searchByPattern(pattern) {
            return new Promise((resolve, reject) => {
                Campaign.find({ 'title': new RegExp(pattern, 'ig') }, (err, campaigns) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(campaigns);
                    }

                });
            });
        },
        getComments(id, pageNumber) {
            const pageSize = 5;
            return new Promise((resolve, reject) => {
                Campaign.find({ _id: id }, 'comments', (err, campaign) => {
                    if (err) {
                        return reject(err);
                    } else {
                        let pagedComments = campaign[0].comments.splice(pageNumber * pageSize, pageSize);
                        console.log(pagedComments);
                        resolve(pagedComments);
                    }
                });
            });
        }
    };
};