/*globals*/

module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllCampaigns()
                .then(campaigns => {
                    res.status(200).render('campaigns/all-campaigns', {
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

                    return res.status(200).render('campaigns/campaign-details', {
                        result: campaign
                    });
                });
        },
        getCreateForm(req, res) {
            return res.status(200).render('campaigns/create-campaign');
        },
        create(req, res) {
            let body = req.body;
            console.log(body);
        }
    };
};