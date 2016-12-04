/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let { expect } = chai;

describe('Campaign data tests', () => {
    let sinon;
    let Campaign = require('./mocks/campaign-model-mocks');
    let data = require('../../server/data/campaign-data')({ Campaign });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('getUserCampaigns()', () => {
        let expectedCreator = {
            id: 5
        };
        let dummyCreator = {
            id: 10
        };

        let campaigns = [
            { id: 1, creator: expectedCreator },
            { id: 2, creator: expectedCreator },
            { id: 3, creator: dummyCreator }
        ];

        beforeEach(() => {
            sinon.stub(Campaign, 'find', (query, cb) => {
                let foundCampaigns = [];
                let creatorId = query['creator.id'];

                campaigns.forEach((campaign) => {
                    if (campaign.creator.id === creatorId) {
                        foundCampaigns.push(campaign);
                    }
                });

                if (foundCampaigns.length < 1) {
                    foundCampaigns = null;
                }
                cb(null, foundCampaigns);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return 2 campaigns', (done) => {
            data.getUserCampaigns(5)
                .then((campaigns) => {
                    expect(campaigns.length).to.equal(2);
                })
                .then(done, done);
        });

        it('Expect to return null if the user has no campaigns', (done) => {
            data.getUserCampaigns(42)
                .then((campaigns) => {
                    expect(campaigns).to.be.null;
                }).then(done, done);
        });

    });

    describe('filterCampaigns()', () => {
        let campaign1 = {
            id: 1,
            title: 'Pari za rakiq',
            creator: 'Bai Ivan',
            category: 'Weird'
        };
        let campaign2 = {
            id: 2,
            title: 'Pari za Catsuit',
            creator: 'Batman',
            category: 'Weird'
        };
        let campaign3 = {
            id: 3,
            title: 'Money for Cryptonite antidote',
            creator: 'Superman',
            category: 'Weird'
        };

        let campaigns = [campaign1, campaign2, campaign3];

        beforeEach(() => {
            sinon.stub(Campaign, 'find', (query, cb) => {
                let foundCampaigns = [];
                
                let filter = query;
                campaigns.forEach((campaign) => {
                    if (campaign.category.indexOf(filter) !== -1
                        || campaign.creator.indexOf(filter) !== -1
                        || campaign.title.indexOf(filter) !== -1) {
                        foundCampaigns.push(campaign);
                    }
                });

                cb(null, foundCampaigns);
            });
        });

        afterEach(() => {
            sinon.restore();
        });


        it('Expect to return 0 campaign', (done) => {
            data.filterCampaigns('somerandomstring')
                .then((campaigns) => {
                    expect(campaigns.length).to.equal(0);
                })
                .then(done, done);
        });

        it('Expect to return 1 campaign', (done) => {
            data.filterCampaigns('Batman')
                .then((campaigns) => {
                    expect(campaigns.length).to.equal(1);
                })
                .then(done, done);
        });

        it('Expect to return 2 campaigns', (done) => {
            data.filterCampaigns('Pari')
                .then((campaigns) => {
                    expect(campaigns.length).to.equal(2);
                })
                .then(done, done);
        });

        it('Expect to return 3 campaigns', (done) => {
            data.filterCampaigns('Weird')
                .then((campaigns) => {
                    expect(campaigns.length).to.equal(3);
                })
                .then(done, done);
        });

    });
});
