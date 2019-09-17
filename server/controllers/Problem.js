const mongo = require('../mongo');
exports.get = async (req, res) => {
    try {
        let { _id } = req.params, queryObj = {}, data = {};
        if (_id) queryObj[_id] = mongo.ObjectId(_id);
        let results = await mongo.find("problems", queryObj);
        if (!_id) { data.results = results; } else { result = results[0]; }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
exports.post = async (req, res) => {
    try {
        let insertObj = req.body;
        let resp = await mongo.insert("problems", insertObj);
        res.json({ resp: resp });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
exports.put = async (req, res) => {
    try {
        let queryObj = { _id: mongo.ObjectId(req.params._id) };
        delete req.body._id;
        let setObj = { $set: req.body };
        let resp = await mongo.update("problems", queryObj, setObj);
        res.json({ resp: resp });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
exports.delete = async (req, res) => {
    try {
        let queryObj = { _id: mongo.ObjectId(req.params._id) }
        let resp = await mongo.delete("problems", queryObj);
        res.json({ resp: resp });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}