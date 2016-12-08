'use strict';           
const db = require(__dirname + '/../lib/mysql');
const moment = require('moment');

exports.get_list_of_tweet = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'SELECT tweetId,authorName,content,timeCreated,noOfLikes,likedBy FROM tweet JOIN follow ON tweet.authorName=follow.following WHERE follower = ? OR following = ?; SELECT * FROM tweet WHERE authorName = ?';
    const payload = [req.params.username,req.params.username,req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            if (data[0]==null) {
                res.status(200).json(data[1]);
            } else {
                res.status(200).json(data[0]);
            }
          console.log('Successfull in getting list of tweets!');
        } else {
            console.log(err);
        }
    });
};

exports.get_own_tweets = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'SELECT * FROM tweet WHERE authorName = ?';
    const payload = [req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
          res.status(200).json(data);
          console.log('Successfull in getting list of current user tweets!');
        } else {
            console.log(err);
        }
    });
};

exports.get_comments = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'SELECT * FROM comment WHERE tweetContent = ?';
    const payload = [req.params.tweetId]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
          res.status(200).json(data);
          console.log('Successfull in getting list of comments!');
        } else {
            console.log(err);
        }
    });
};

exports.add_tweet = (req, res, next) => {
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    const query_string = 'INSERT INTO tweet SET ?';
    const payload = {
        authorName: req.body.authorName, 
        content: req.body.content, 
        timeCreated: curdate, 
        noOfLikes: req.body.noOfLikes,
        likedBy : req.body.likedBy
    };

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.send(data);
            console.log('Successful in posting a tweet!');
        } else {
            console.log('An error occurred in posting this tweet!');
            console.log(err);
        }
    });
};

exports.update_tweet = (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }

    const query_string = 'UPDATE tweet SET content = ?, likedBy = ?, noOfLikes = ? WHERE tweetId = ?;';
    const payload = [req.body.content, req.body.likedBy, req.body.noOfLikes, req.body.tweetId];

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.status(200).send();
            console.log('Successful in updating a tweet!');
        } else {
            res.status(400).send();
            console.log('An error occurred in updating this tweet!');
        }
    });
};

exports.delete_tweet = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    var id = req.params.tweetId;
    if (id == null || id == '') {
        res.status(400).send();
    } 

    const query_string = 'DELETE FROM tweet WHERE tweetId = ?;';

    db.query(query_string, [id], (err, data) => {
        if(!err) {
            res.status(200).send();
            console.log('Successful in deleting this tweet!');
        } else {
            res.status(400).send();
            console.log('An error occurred in deleting this tweet!');
        }
    });
};

exports.add_comment = (req, res, next) => {
    let curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    const query_string = 'INSERT INTO comment SET ?';
    const payload = {
        contentComment: req.body.contentComment,
        timeCreated: curdate, 
        accountName: req.body.accountName,
        tweetContent : req.body.tweetContent,
        noOfLikes : req.body.noOfLikes,
        likedBy : req.body.likedBy
    };

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.send(data);
            console.log('Successful in posting a comment!');
        } else {
            console.log('An error occurred in posting this comment!');
            console.log(err);
        }
    });
};

exports.like_unlike_comment = (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }

    const query_string = 'UPDATE comment SET likedBy = ?, noOfLikes = ? WHERE commentId = ?;';
    const payload = [req.body.likedBy, req.body.noOfLikes, req.body.commentId];

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.status(200).send();
            console.log('Successful in updating a comment!');
        } else {
            res.status(400).send();
            console.log('An error occurred in updating this comment!');
        }
    });
};