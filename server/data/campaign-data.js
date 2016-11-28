/*globals */

module.exports = function(models) {
    let Campaign = models.Campaign;

    return {
        filterCampaigns(filter) {
            return new Promise((resolve, reject) => {
                Campaign.find({ filter }, (err, campaigns) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(campaigns);
                    }
                })
            })
        },
        getAllCampaigns() {
            return new Promise((resolve, reject) => {
                Campaign.find((err, campaigns) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(campaigns);
                });
            });
        },
        findCampaignsByCategory(category) {
            return new Promise((resolve, reject) => {
                Campaign.find({ category }, (err, campaigns) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(campaigns);
                });
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
        }
    };
};