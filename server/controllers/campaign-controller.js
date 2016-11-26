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
            let campaign = {
                _id: req.params.id,
                title: 'Idea for millions',
                description: 'lorem ipsum dolar sit amet summoning deamons blabalbalbablalb'
            };
            res.status(200).render('campaigns/campaign-details', { campaign });
            // data.getCampaignById(req.params.id)
            //     .then(campaign => {
            //         if (campaign === null) {
            //             return res.status(404)
            //                 .redirect('/error');
            //         }

            //         return res.status(200).render('campaigns/campaign-details', {
            //             result: campaign
            //         });
            //     });
        },
        getCreateForm(req, res) {
            return res.status(200).render('campaigns/create-campaign');
        },
        create(req, res) {
            let body = req.body;
            console.log(body);
        },
        getByCategory(req, res) {

            data.findCampaigns(category)
                .then((categories) => {
                    return res.render('campaigns/all-campaigns', {
                        result: categories
                    })
                });
        },
        donate(req, res) {
            let campaignId = req.body_id;
            let valueToDonate = +req.body.donationValue;

            data.fundCampaign(campaignId, valueToDonate)
                .then(() => {
                    res.send("Value Funded");
                });
        }
    };
};