/*globals */

module.exports = function (models) {
    let Campaign = models.Campaign;

    return {
        GetAllCampaigns() {
            return new Promise((resolve, reject) => {
                Campaign.find((err, campaigns)=>{
                    if (err) {
                        return reject(err);
                    }

                    return resolve(campaigns);
                });
            });
        }
    };
};