/*globals */

module.exports = function (models) {
    let Campaign = models.Campaign;

    return {
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
        findCampaigns(filter) {
            return new Promise((resolve, reject) => {
                Campaign.find({ filter }, (err, campaigns) => {
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

        },
        fundCampaign(id, value) {
            return this.getCampaignById(id)
                .then((campaign) => {
                    campaign.funded += value;
                });
        }
    };
};