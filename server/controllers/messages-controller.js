module.exports = function ({data}) {
    return {
        getMessageForm(req, res) {
            let userId = JSON.stringify(req.user._id);
            data.loadCurrentConversations(userId.substring(1, userId.length - 1))
                .then(messages => {
                    res.status(200).render('messages/messages', {
                        result: parseMessages(messages, req.user._id)
                    });
                });
        },
        initializeMessage(req, res) {
            var id = JSON.stringify(req.user._id);
            let firstUser = {
                username: req.user.username,
                id: id.substring(1, id.length - 1),
                avatar: req.user.avatar
            };

            let secondUser = {
                username: req.body.username,
                id: req.body.id,
                avatar: req.body.avatar
            };

            var usernames = [firstUser.username, secondUser.username].sort();
            let identification = usernames[0] + usernames[1];

            data.findByIdentification(identification)
                .then((message) => {
                    if (message) {
                        res.status(201).json({
                            success: true,
                            redirect: '/messages'
                        });
                    } else {
                        data.createConversation({ firstUser, secondUser, identification })
                            .then(() => {
                                res.status(201).json({
                                    success: true,
                                    redirect: '/messages'
                                });
                            });
                    }
                });
        },
        getTexts(req, res) {
            let usernames = [req.user.username, req.body.username].sort();
            let identification = usernames[0] + usernames[1];
            let loggedUsername = req.user.username;

            data.findByIdentification(identification)
                .then(message => {
                    console.log(message);
                    res.status(200).json({
                        texts: message.texts,
                        loggedUser: loggedUsername
                    });
                });
        },

        addMessage(req, res) {
            let identification = req.body.identification;
            let text = req.body.text;
            let owner = req.user.username;
            let date = JSON.stringify(Date());

            data.addMessage(identification, text, owner, date)
                .then(() => {
                    res.status(200).json({
                        texts: [{
                            date: date,
                            owner: owner,
                            text: text
                        }],
                        loggedUser: owner
                    });
                });

        }
    };
};

function parseMessages(messages, id) {
    let result = [];
    messages.forEach(message => {
        let user;
        let usernames = [message.firstUser.username, message.secondUser.username].sort();
        let identification = usernames[0] + usernames[1];
        if (message.firstUser.id != id) {
            user = message.firstUser;
        } else {
            user = message.secondUser;
        }
        result.push({ user, identification });
    });
    return result;
}