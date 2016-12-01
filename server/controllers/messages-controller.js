module.exports = function (options) {
    return {
        getMessageForm(req, res){
             res.status(200).render('messages/messages', {
                        result:[]
                    });
        }
    };
};