const syncRequest = require('sync-request');
const syncXmlJson = require('fast-xml-parser');
const fs = require('fs');
const path = require('path');

// const allowed_chara = 'abc'.split('');
const allowed_chara = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

function make_request(user) {
    let x = syncRequest('GET', `https://myanimelist.net/malappinfo.php?u=${user}&status=all&type=anime`).getBody('utf8');
    let data = syncXmlJson.parse(x);
    
    return data;
}

function generate_string(user, data) {
    let str = '';
    if(Array.isArray(data.myanimelist.anime)){
        data.myanimelist.anime.forEach((val) => {
            str += val.my_score + ':' + val.series_title + '\n';
        })
    } else {
        str = data.myanimelist.anime.my_score + ':' + data.myanimelist.anime.series_title + '\n'
    }
    
    return str;
}

function write_to_fs (user, data){
    let to_write = user + '\n' + data;
    fs.writeFileSync(path.join(__dirname, 'crawled', user + '.txt'), to_write);
}

let totErr = 0;
let tot = 0;

function crawl(start, target) {
    for (let i = start; i < target; i++) {
        job('', i);
    }
    
    function job(cur, target) {
        if(cur.length + 1 == target) {
            allowed_chara.forEach(c => {
                tot += 1;
                helper(cur+c);
            });
        } else if (cur.length + 1 < target) {
            allowed_chara.forEach(c => {
                job(cur + c, target)
            })
        }
    }
}

function sort_by_score(a, b) {
    return a.my_score - b.my_score;
}

function helper(user) {
    let data = make_request(user);
    
    if(data.myanimelist.myinfo == undefined || data.myanimelist.anime == undefined) {
        totErr += 1;
        console.log(`(${tot}) ` + user + ' not a valid user, total error ' + totErr)
        return;
    }
    
    if(Array.isArray(data.myanimelist.anime)){
        // Mencegah error untuk user yang hanya menonton 1 anime,,, I looking at you 'az'
        data.myanimelist.anime.sort(sort_by_score);
    }

    let str = generate_string(user, data);
    
    write_to_fs(user, str);
    console.log(`(${tot}) ` + user + ' succesfully crawled');
    
}

let startTime = Date.now();
crawl(3, 10);
let finishTime = Date.now();

console.log(`Time start on ${new Date(startTime)}`);
console.log(`Finished on ${new Date(finishTime)}`);
console.log('Time spent: ' + (finishTime - startTime) + 'ms');

// let x = make_request('hariangr');
// console.log(x);
// console.log(x.myanimelist.anime);
// console.log(Array.isArray(x.myanimelist.anime));