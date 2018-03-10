const crawler = require('./crawler')
const db = require('./database')

let _crawlErr = 0;
let _crawlSuc = 0;

function namer(desired){
    let x = allowed.split('');
    let cont = []
    
    function addChar(_cur, _target) {
        if(_cur.length + 1 == _target) {
            x.forEach(v => {
                cont.push(_cur + v)
            });
        } else if(_target ==0){
            cont.push('');
        } else {
            x.forEach(v => {
                addChar(_cur + v, _target);
            });
        }
    }
    
    for(let i = 0; i<=desired; i++){
        addChar('', i)
    }
    
    return cont;
}

let lengthAllowed = 4;
const allowed = '0987654321abcdefghijklmnopqrstuvwxyz'
// const allowed = 'abc'
let toCrawl = namer(lengthAllowed);
console.log(toCrawl.length)

// for (let i = 0; i < toCrawl.length; i++) {
//     const _user = toCrawl[i];
    
//     crawler.crawl(_user);
    
//     if(i % 100 == 0) {
//         console.log(i + '/' + toCrawl.length)
//     }
    
//     console.log(_user)
// }

// console.log('finished\nError: ' + _crawlErr + '\nSukses: ' + _crawlSuc);

console.log('start');

// // let toCrawl = ['a', 'hariangr', 'c', 'aa', 'ab', 'ac']
// function callme(cur){
//     let c = toCrawl[cur];
//     console.log((cur+1) + '/' + toCrawl.length + ' : ' + c)
//     crawler.crawl(c, () => {
//         if(cur + 1 < toCrawl.length){
//             callme(cur + 1)
//         }
//     })
// }

// callme(0)