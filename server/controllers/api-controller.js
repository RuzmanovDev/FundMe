
var Grid = require('gridfs');

module.exports = function (options) {
    return {
        getPicture(req, res) {
            var gfs = Grid(options.database.connection.db, options.database.mongo);
            var id = req.params.id;
            gfs.readFile({ _id: id }, (_, data) => {
                res.write(data);
                res.end();
            });
        },
         getCommentsJson(req, res) {
            let pageNumber = +req.query.pageNumber || 0;

            if (pageNumber < 0) {
                pageNumber = 0;
            }

            options.data.getComments(req.params.campaignId, pageNumber)
                .then((comments) => {
                    res.status(200).json(comments);
                });

        }
    };
};