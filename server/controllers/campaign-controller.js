/*globals*/

var Grid = require('gridfs');

module.exports = function (options) {
    return {
        filterCategories(filter) {

        },
        getAll(req, res) {
            let pageNumber = 0;
            let pageSize = 5;
            options.data.getAllCampaigns(pageNumber, pageSize)
                .then(campaigns => {
                    res.status(200).render('campaigns/all-campaigns', {
                        result: campaigns
                    });
                });
        },

        getJson(req, res) {
            let pageNumber = +req.query.pageNumber || 0;
            let pageSize = +req.query.pageSize || 5;
            let category = req.query.category;
            if (category) {
                options.data.getAllCampaigns(pageNumber, pageSize)
                    .then(campaigns => {
                        res.status(200).send(campaigns);
                    });
            } else {
                options.data.findCampaignsByCategory(category, pageNumber, pageSize)
                    .then(campaigns => {
                        res.status(200).send(campaigns);
                    });
            }

        },
        getById(req, res) {
            let pageNumber = +req.query.pageNumber || 0;
            let pageSize = +req.query.pageSize || 5;

            if (pageNumber < 0) {
                pageNumber = 0;
            }

            if (pageSize < 0) {
                pageSize = 5;
            }

            if (pageSize > 50) {
                pageSize = 50;
            }

            options.data.getCampaignById(req.params.id)
                .then(campaign => {
                    if (campaign === null) {
                        return res.status(404)
                            .redirect('/error');
                    }

                    let totalPages = [];
                    campaign.comments.map((_, i) => totalPages.push(i + 1));
                    let pagedComments = campaign.comments
                        .splice(pageNumber * pageSize, pageSize);
                    // campaign.comments = pagedComments;

                    campaign['loggedUser'] = {};
                    if (req.user) {
                        campaign.loggedUser['loggedIn'] = true;
                        if (campaign.likedBy.indexOf(req.user.username) >= 0) {
                            campaign.loggedUser['alredayLiked'] = true;
                        }
                    } else {
                        campaign.loggedUser['loggedIn'] = false;
                    }

                    return res.status(200).render('campaigns/campaign-details', {
                        campaign, pagedComments, totalPages
                    });
                });
        },
        getCreateForm(req, res) {
            return res.status(200).render('campaigns/create-campaign');
        },
        create(req, res) {
            let title = req.body.title;
            let description = req.body.description;
            let createdOn = new Date();
            let comments = [];
            let creator = {
                username: req.user.username,
                id: req.user.id
            };
            let donators = [];
            let upVotes = 0;
            let target = req.body.target;
            let funded = 0;
            let category = req.body.category;

            let gfs = Grid(options.database.connection.db, options.database.mongo);
            let data = options.data;

            gfs.writeFile({}, req.file.buffer, (_, file) => {
                let image = file._id;
                let campaign = {
                    title,
                    description,
                    createdOn,
                    comments,
                    creator,
                    donators,
                    upVotes,
                    target,
                    funded,
                    image,
                    category
                };
                data.createCampaign(campaign)
                    .then(() => {
                        res.redirect('/campaigns');
                    });
            });

        },
        getByCategory(req, res) {
            let category = req.params.name;
            let pageNumber = 0;
            let pageSize = 5;
            options.data.findCampaignsByCategory(category, pageNumber, pageSize)
                .then((campaigns) =>
                    res.render('campaigns/all-campaigns', {
                        result: campaigns
                    })
                );
        },
        donate(req, res) {
            let campaignId = req.body.campaignId;
            let valueToDonate = +req.body.donationValue;
            options.data.fundCampaign(campaignId, valueToDonate)
                .then(() => {
                    res.json({
                        massage: 'campaign funded'
                    });
                });
        },
        getPicture(req, res) {
            var gfs = Grid(options.database.connection.db, options.database.mongo);
            var id = req.params.id;
            gfs.readFile({ _id: id }, (_, data) => {
                res.write(data);
                res.end();
            });
        },
        vote(req, res) {
            let campaignId = req.body.campaignId;
            let userLikedCampaign = req.user.username;
            options.data.voteCampaign(campaignId, userLikedCampaign)
                .then(() => {
                    res.status(201);
                });
        },
        createComment(req, res) {
            let author = req.user.username;
            let content = req.body.commentContent;
            let campaignId = req.body.campaignId;

            let comment = {
                campaignId,
                author,
                content
            };

            options.data.createComment(comment)
                .then(() => {
                    res.redirect(`/campaigns/campaign/${campaignId}`);
                });
        },
        search(req, res){
            var pattern = req.query.q;
             options.data.searchByPattern(pattern)
                .then(campaigns => {
                    res.status(200).render('campaigns/all-campaigns', {
                        result: campaigns
                    });
                });
        }
    };
};