/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let {expect} = chai;

describe('Message data test', () => {
    let sinon;
    let Message = require('./mocks/message-model-mocks');
    let data = require('../../server/data/message-data')({ Message });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('loadCurrentConversations()', () => {
        let firstUserId = 2;

        let firstUser = {
            _id: firstUserId
        };

        let expectedMessages = [{
            firstUser,
            content: 'test'
        }];

        beforeEach(() => {
            sinon.stub(Message, 'find', (query, cb) => {
                let id = query._id;
                cb(null, expectedMessages);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return messages in conversation by given firstUserID', (done) => {
            data.findByIdentification(firstUserId)
                .then((messages) => {
                    expect(messages).to.equal(expectedMessages);
                })
                .then(done, done);
        });
    });
});