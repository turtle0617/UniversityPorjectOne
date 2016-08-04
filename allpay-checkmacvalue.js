/*
 * author: es <es@evsfy.com>
 * description:
 * This script helps you battle with Allpay's CheckMacValue.
*/
const crypto = require('crypto');
String.prototype.allpayURLencode = function() {
    var replace_map = {
        ' ': '+',
        '-': '-',
        '_': '_',
        '.': '.',
        '!': '!',
        '~': '%7e',
        '*': '*',
        '(': '(',
        ')': ')',
        '@': '%40',
        '#': '%23',
        '$': '%24',
        '%': '%25',
        '^': '%5e',
        '&': '%26',
        '=': '%3d',
        '+': '%2b',
        ';': '%3b',
        '?': '%3f',
        '/': '%2f',
        '\\': '%5c',
        '>': '%3e',
        '<': '%3c',
        '`': '%60',
        '[': '%5b',
        ']': '%5d',
        '{': '%7b',
        '}': '%7d',
        ':': '%3a',
        '\'': '%27',
        '"': '%22',
        ',': '%2c',
        '|': '%7c',
    };
    var re = new RegExp(Object.keys(replace_map).join("|\\"),"gi");
    return this.replace(re, function(matched){
        return replace_map[matched];
    });
};

function allpayURLEncode(toString, hashiv, raw_string) {
    /*
     * hashkey, hashiv: see allpay's documentation
     * raw_string: whole raw stringn without hashkey/hashiv
    */
    var raw = raw_string.split('&').sort().join('&');
    var hashkey = 'HashKey=' + hashkey + '&';
    var hashiv = '&HashIV=' + hashiv;
    var queryString = hashkey + raw + hashiv;
    return queryString.allpayURLencode().toLowerCase();
}

function hash(hashmethod, raw_string) {
    const hash = crypto.createHash(hashmethod);
    hash.update(raw_string);
    return hash.digest('hex');
}