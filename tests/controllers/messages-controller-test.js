/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let { expect } = chai;

describe('Message controller test', () => {
    let sinon;
    let data = {
        loadCurrentConversations() {
            return new Promise((resolve, reject) => {
                resolve([{

                    firstUser: {
                        username: 'gosho'
                    },
                    secondUser: {
                        username: 'pesho'
                    }

                }]);
            });
        },
        findByIdentification() {
            return new Promise((resolve, reject) => {
                resolve({

                    firstUser: {
                        username: 'gosho'
                    },
                    secondUser: {
                        username: 'pesho'
                    }

                });
            });
        }
    };
    let req = {
        user: { _id: 'gosho', username: 'gosho', avatar: 'gosho' },
        body: { id: 'gosho', username: 'gosho', avatar: 'gosho' }
    };
    let res = {
        render() { },
        status() { return this; },
        json(){

        }
    };
    let controller = require('../../server/controllers/messages-controller')({ data });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('getMessageForm() tests', () => {

        it('To call the data.loadCurrentConversations function', () => {
            let spy = sinon.spy(data, 'loadCurrentConversations');
            controller.getMessageForm(req, res);
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });

        it('To call the res.status function', () => {
            let spy = sinon.spy(res, 'status');
            controller.getMessageForm(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });

        it('To call the res.render function', () => {
            let spy = sinon.spy(res, 'render');
            controller.getMessageForm(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });
    });

    describe('initializeMessage() tests', () => {

        it('To call the data.findByIdentification function', () => {
            let spy = sinon.spy(data, 'findByIdentification');
            controller.initializeMessage(req, res)
                .then(() => {
                    expect(spy.calledOnce).to.be.true;
                    spy.restore();
                })

        });

        it('To call the res.json function', () => {
            let spy = sinon.spy(res, 'json');
            controller.initializeMessage(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });

        it('To call the res.status function', () => {
            let spy = sinon.spy(res, 'status');
            controller.initializeMessage(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });
    });

     describe('getTexts() tests', () => {

        it('To call the data.findByIdentification function', () => {
            let spy = sinon.spy(data, 'findByIdentification');
            controller.getTexts(req, res)
                .then(() => {
                    expect(spy.calledOnce).to.be.true;
                    spy.restore();
                })

        });

        it('To call the res.json function', () => {
            let spy = sinon.spy(res, 'json');
            controller.getTexts(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });

        it('To call the res.status function', () => {
            let spy = sinon.spy(res, 'status');
            controller.getTexts(req, res)
                .then(() => {
                    expect(spy.called).to.be.true;
                    spy.restore();
                })

        });
    });
});
