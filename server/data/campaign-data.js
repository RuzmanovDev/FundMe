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
                    creatorId: campaign.creator._id,
                    creatorName: campaign.creator.username
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
                });
        }
    };
};