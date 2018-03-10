const request = require('request');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const db = require('./db')

exports.crawl = function(_user, callback) {
    console.log('crawl');
    
    request('https://myanimelist.net/malappinfo.php?u=' + _user + '&status=all&type=anime', 
    (err, res, body) => {
        xml2js.parseString(body, (err, res) => {
            if(res.myanimelist.anime == null){
                callback()
                return;
            }
            // console.log(res);
            // console.log(res.myanimelist.anime[0])
            
            res.myanimelist.anime.sort(sortByScore)
            
            let _str = _user + '\n';    
            res.myanimelist.anime.forEach(anime => {
                _str += anime.my_score + ':' + anime.series_animedb_id + ';';
            });
            
            // writeToDb(_user, _str, callback)
            writeToFs(_user, _str, callback)
            
            return true;
        })
    })
    return false;
}

function writeToDb(_user, _data, callback) {
    db.insert(
        {user: _user, anime: _data},
        (err, val) => {
            console.log('ok')
            callback()
        }
    )
}

function writeToFs(user, data, callback) {
    fs.writeFileSync(path.join(__dirname, 'crawled', user + '.txt'), data)
    callback()
}

function sortByScore(a, b) {
    return a.my_score - b.my_score
}