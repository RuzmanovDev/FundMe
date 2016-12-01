

module.exports = function ({grid, database, data}) {
    return {
        getPicture(req, res) {
            var gfs = grid(database.connection.db, database.mongo);
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

            data.getComments(req.params.campaignId, pageNumber)
                .then((comments) => {
                    res.status(200).json(comments);
                });

        }
    };
};