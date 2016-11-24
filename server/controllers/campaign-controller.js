/*globals*/

module.exports = function (data) {
    return {
        getAll(req, res) {
            data.GetAllCampaigns()
                .then(campaigns => {
                    res.render('all-campaigns', {
                        result: campaigns
                    });
                });
        }
    };
};