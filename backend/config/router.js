'use strict';

const tweets = require(__dirname + '/../controllers/tweet');
const users  = require(__dirname + '/../controllers/user');
const jwt    = require('express-jwt');
const secret = require(__dirname + '/secret');
const tokenManager = require(__dirname + '/token_manager');

module.exports = (router) => {

    router.del = router.delete;

    router.post('/api/account/login',               users.login);
    router.get ('/api/account/logout', jwt({secret: secret.secretToken}), users.logout); 
    router.post('/api/account/signup',              users.signup);
    router.get ('/api/account/:username/followers', jwt({secret: secret.secretToken}), tokenManager.verifyToken , users.get_followers);
    router.get ('/api/account/:username/following', jwt({secret: secret.secretToken}), tokenManager.verifyToken , users.get_following);
    router.get ('/api/account/:username/all',       users.get_all_users);
    router.get ('/api/account/:username/data',      users.get_user_data);

    router.post('/api/user/follow', jwt({secret: secret.secretToken}), tokenManager.verifyToken, users.follow_user);
    router.del ('/api/user/unfollow/:followId', jwt({secret: secret.secretToken}), tokenManager.verifyToken , users.unfollow_user);

    router.get ('/api/tweet/all/:username', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.get_list_of_tweet);
    router.get ('/api/tweet/:username', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.get_own_tweets);
    router.post('/api/tweet/add', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.add_tweet);
    router.post('/api/tweet/add/comment', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.add_comment);
    router.put ('/api/tweet/edit', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.update_tweet);
    router.del ('/api/tweet/delete/:tweetId', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.delete_tweet);
    router.get ('/api/tweet/comment/:tweetId', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.get_comments);
    router.put ('/api/tweet/comment/edit', jwt({secret: secret.secretToken}), tokenManager.verifyToken , tweets.like_unlike_comment);

    router.all('*', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', 'http://localhost');
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });

    return router;
}