(() => {
    'use strict';

    angular
        .module('app')
        .factory('TweetService', TweetService);

    TweetService.$inject = ['$http', '$q'];

    function TweetService($http, $q) {
        const service = {
            get_tweets      : get_tweets,
            get_own_tweets  : get_own_tweets,
            get_comments    : get_comments,
            getFollowing    : getFollowing,
            getFollowers    : getFollowers,
            getUsers        : getUsers,
            getUserData     : getUserData,
            add_tweet       : add_tweet,
            update_tweet    : update_tweet,
            delete_tweet    : delete_tweet,
            likeTweet       : likeTweet,
            unlikeTweet     : unlikeTweet,
            comment         : comment,
            likeComment     : likeComment,
            unlikeComment   : unlikeComment,
            follow          : follow,
            unfollow        : unfollow
        }

        return service;

        function get_tweets(username) {
            return $http.get('/api/tweet/all/' + username);
        }

        function get_own_tweets(username) {
            return $http.get('/api/tweet/' + username);
        }

        function get_comments(tweetId) {
            return $http.get('/api/tweet/comment/' + tweetId);
        }

        function getFollowing(username) {
            return $http.get('/api/account/' + username + '/following');
        }

        function getFollowers(username) {
            return $http.get('/api/account/' + username + '/followers');
        }

        function getUsers(username) {
            return $http.get('/api/account/' + username + '/all');
        }

        function getUserData(username) {
            return $http.get('/api/account/' + username + '/data');
        }

        function add_tweet(tweet) {
            let deferred = $q.defer();

            var user = JSON.parse(localStorage.userdata);

            let data = {
                authorName: user.username,
                content: tweet.content,
                noOfLikes: 0
            }

            $http.post('/api/tweet/add', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function update_tweet(tweet) {
            let deferred = $q.defer();

            let data = {
                authorName: tweet.authorName,
                content: tweet.content,
                timeCreated: tweet.timeCreated,
                noOfLikes: tweet.noOfLikes,
                likedBy : tweet.likedBy,
                tweetId: tweet.tweetId
            }

            $http.put('/api/tweet/edit', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function delete_tweet(tweetId) {
            let deferred = $q.defer();
            
            $http.delete('/api/tweet/delete/' + tweetId)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function likeTweet(tweet) {
            let deferred = $q.defer();

            var user = JSON.parse(localStorage.userdata);

            let data = {
                authorName: tweet.authorName,
                content: tweet.content,
                timeCreated: tweet.timeCreated,
                noOfLikes: 1,
                likedBy : user.username,
                tweetId: tweet.tweetId
            }

            $http.put('/api/tweet/edit', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function unlikeTweet(tweet) {
            let deferred = $q.defer();

            let data = {
                authorName: tweet.authorName,
                content: tweet.content,
                timeCreated: tweet.timeCreated,
                noOfLikes: 0,
                likedBy : null,
                tweetId: tweet.tweetId
            }

            $http.put('/api/tweet/edit', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function comment(tweet) {
            let deferred = $q.defer();

            $http.post('/api/tweet/add/comment', tweet)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function likeComment(comment) {
            let deferred = $q.defer();

            var user = JSON.parse(localStorage.userdata);

            let data = {
                contentComment: comment.contentComment,
                timeCreated: comment.timeCreated,
                accountName : comment.accountName,
                tweetContent : comment.tweetContent,
                noOfLikes: 1,
                likedBy : user.username,
                commentId : comment.commentId
            }

            $http.put('/api/tweet/comment/edit', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function unlikeComment(comment) {
            let deferred = $q.defer();

            let data = {
                contentComment: comment.contentComment,
                timeCreated: comment.timeCreated,
                accountName : comment.accountName,
                tweetContent : comment.tweetContent,
                noOfLikes: 0,
                likedBy : null,
                commentId : comment.commentId
            }

            $http.put('/api/tweet/comment/edit', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function follow(other) {
            let deferred = $q.defer();

            var user = JSON.parse(localStorage.userdata);

            let data = {
                following : other.username,
                follower : user.username
            }
            
            $http.post('/api/user/follow/', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function unfollow(followId) {
            let deferred = $q.defer();
            
            $http.delete('/api/user/unfollow/' + followId)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
        
    }
})();