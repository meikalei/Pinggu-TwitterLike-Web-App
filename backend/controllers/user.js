'use strict';

const db = require(__dirname + '/../lib/mysql');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const redisClient = require('../config/redis_database').redisClient;
const tokenManager = require('../config/token_manager');

exports.login = (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    function start(){
       const query = "select * from account where username = ? and loginPassword = ?";

       db.query(
            query,
            [data.username,data.password],
            send_response
        );
    }

    function send_response(err, result, args, last_query){
        if(err){
            //next(err);
            return res.sendStatus(500);
        }
        else if(!result.length) {
        	console.log(result);
            return res.sendStatus(404);
        }
        else {
            let user = {
                username: result[0].username
            }
            console.log(result[0]);
            console.log('SUCCESSFULLY LOGGED IN!');

            const token = jwt.sign(user, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });
			
			return res.json({token:token, userdata:result[0]});
        }
    }
    start();
}

exports.logout = function(req, res) {
	if (req.user) {
		tokenManager.expireToken(req.headers);

		delete req.user;	
		return res.sendStatus(200);
	}
	else {
		return res.sendStatus(401);
	}
}

exports.signup = (req, res, next) => {
	const query_string = 'INSERT INTO account SET ?;';
	const payload = {
        username: req.body.username,
        email: req.body.email,
        loginPassword : req.body.loginPassword,
        name : req.body.name
    };

	db.query(query_string, payload, (err, data) => {
		if(!err) {
			res.status(200).send();
			console.log('Successful in creating an account!');
		} else {
            res.status(500).send();
            console.log(err);
			console.log('An error occurred in creating an account!');
		}
	});
};

exports.follow_user = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'INSERT INTO follow SET ?';
    const payload = {
        following : req.body.following,
        follower: req.body.follower
    };

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.status(200).send();
            console.log('Successful in following an account!');
        } else {
            console.log('An error occurred in following an account!');
        }
    }); 
};

exports.unfollow_user = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    var id = req.params.followId;
    if (id == null || id == '') {
        res.status(400).send();
    }

    const query_string = 'DELETE FROM follow WHERE followId = ?';

    db.query(query_string, [id], (err, data) => {
        if(!err) {
            res.status(200).send();
            console.log('Successful in unfollowing an account!');
        } else {
            console.log('An error occurred in unfollowing an account!');
        }
    });
};

exports.get_followers = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'SELECT * FROM follow WHERE following = ?';
    const payload = [req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.status(200).json(data);
            console.log('Successful in getting all followers!');
        } else {
            console.log('An error occurred in getting all followers!');
        }
    });
};

exports.get_following = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send();
    }

    const query_string = 'SELECT * FROM follow WHERE follower = ?';
    const payload = [req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            res.status(200).json(data);
            console.log('Successful in getting all followed users!');
        } else {
            console.log('An error occurred in getting all followed users!');
        }
    });
};

exports.get_all_users = (req, res, next) => {
    const query_string = 'SELECT username,name FROM account WHERE username != ?';
    const payload = [req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
          res.status(200).json(data);
          console.log('Successfull in getting list of users!');
        } else {
            console.log(err);
        }
    });
};

exports.get_user_data = (req, res, next) => {
    const query_string = 'SELECT username,name FROM account WHERE username = ?';
    const payload = [req.params.username]

    db.query(query_string, payload, (err, data) => {
        if(!err) {
          res.status(200).json(data);
          console.log('Successfull in getting other user data!');
        } else {
            console.log(err);
        }
    });
};