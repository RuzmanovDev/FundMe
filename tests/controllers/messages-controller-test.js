/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let { expect } = chai;

describe('Message controller test', () => {
    let sinon;
    let data = {
        loadCurrentConversations() { }
    };
    let req = { user: { _id: 'gosho' } };
    let res = {
        render() { }
    };
    let controller = require('../../server/controllers/messages-controller')(data);

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('getMessageForm() tests', () => {
        beforeEach(() => {
            sinon.stub(data, 'loadCurrentConversations', (id) => {
                return new Promise((resolve, reject) => {
                    resolve({ id });
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it('To call the req.user._id property', () => {
                let spy = sinon.spy(req.user._id);
                controller.getMessageForm(req, res);
                expect(spy.calledOnce).to.be.true;
            });

            it('To call the data.loadCurrentConversations function', () => {
                let spy = sinon.spy(data.loadCurrentConversations);
                controller.getMessageForm(req, res);
                expect(spy.calledOnce).to.be.true;
            });
        });
    });
});
