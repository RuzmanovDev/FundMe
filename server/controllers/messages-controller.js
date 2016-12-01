module.exports = function ({data}) {
    return {
        getMessageForm(req, res) {
            data.loadCurrentConversations(req.user._id)
                .then(messages => {
                    res.status(200).render('messages/messages', {
                        result: parseMessages(messages, req.user._id)
                    });
                });
        },
        initializeMessage(req, res) {
            var id = req.user._id;
            let firstUser = {
                username: req.user.username,
                id: id,
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
        }
    };
};

function parseMessages(messages, id) {
    let result = [];
    messages.forEach(message => {
        let user;
        if (message.firstUser.id === id) {
            user = message.firstUser;
        } else {
            user = message.secondUser;
        }
        result.push({ user });
    });
    return result;
}