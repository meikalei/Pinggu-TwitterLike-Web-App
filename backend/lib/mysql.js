'use strict';

const mysql  = require('mysql');

module.exports = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'admin',
    database    : 'twitterLike',
    dateStrings : true,
    multipleStatements : true
});