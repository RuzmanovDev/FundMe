/*globals*/

module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllCampaigns()
                .then(campaigns => {
                    res.render('all-campaigns', {
                        result: campaigns
                    });
                });
        },
        getById(req, res) {
            data.getCampaignById(req.params.id)
                .then(campaign => {
                    if (campaign === null) {
                        return res.status(404)
                            .redirect('/error');
                    }

                    return res.render('campaign-details', {
                        result: campaign
                    });
                });
        }
    };
};