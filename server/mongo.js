const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017', dbName = "bucket";
let db = {};

exports.connect = async () => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);
        return "Mongodb connected";
    } catch (err) { throw err };
}
exports.find = (collectionName, queryObj) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).find(queryObj).toArray((err, results) => {
            if (err) return reject(err);
            resolve(results);
        })
    });
}
exports.insert = (collectionName, insertObj) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(insertObj, (err, resp) => {
            if (err) return reject(err);
            resolve(resp);
        })
    });
}
exports.update = (collectionName, queryObj, updateObj) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).updateOne(queryObj, updateObj, (err, resp) => {
            if (err) return reject(err);
            resolve(resp);
        })
    });
}
exports.delete = (collectionName, queryObj) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne(queryObj, (err, resp) => {
            if (err) return reject(err);
            resolve(resp);
        })
    });
}
exports.ObjectId = mongodb.ObjectId;