const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const Config = require('./config')

mongoose.connect(Config.mongo_db_url);

const schema = new Schema({
    user        : String,
    anime       : String
})

exports.Crawled = mongoose.model('Crawled', schema);

exports.insert = function(_data, callback) {
    new exports.Crawled(_data).save(callback);
};

// exports.listAll = function(callback) {
//     Article.find({}, function (err, res) {
//         if(res.length == 0) err = 'Not Found';

//         callback(err, res)
//     })
// };

// exports.update = function(id, updatedField, callback) {
//     Article.update({_id: id}, {$set: updatedField}, callback)
// };

// exports.get = function(id, callback) {
//     Article.findById(id, (err, res) => {
//         if(res == null) err = 'Not Found';
//         callback(err, res);
//     });
// };

// exports.delete = function(id, callback){
//     Article.deleteOne({_id: id}, callback)
// };

// exports.find = function(rule, callback){
//     Article.find(rule,callback)
// }