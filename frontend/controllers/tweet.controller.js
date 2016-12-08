(() => {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['$scope', '$route', '$location', '$routeParams', 'TweetService'];

    function TweetController($scope, $route, $location, $routeParams, TweetService) {
        $scope.user = JSON.parse(localStorage.userdata);
        $scope.tweets = [];
        $scope.ownTweets = [];
        $scope.comments = [];
        $scope.currentTweet = {};
        $scope.following = [];
        $scope.followers = [];
        $scope.otherUsers = [];

        $scope.getCurrentTweet = getCurrentTweet;
        $scope.add_tweet = add_tweet;
        $scope.update_tweet = update_tweet;
        $scope.delete_tweet = delete_tweet;
        $scope.isLiked = isLiked;
        $scope.likeTweet = likeTweet;
        $scope.unlikeTweet = unlikeTweet;
        $scope.comment = comment;
        $scope.isLikedComment = isLikedComment;
        $scope.likeComment = likeComment;
        $scope.unlikeComment = unlikeComment;
        $scope.getFollowing = getFollowing;
        $scope.getFollowers = getFollowers;
        $scope.search = search;
        $scope.getUsers = getUsers;
        $scope.goToProfile = goToProfile;
        $scope.follow = follow;
        $scope.unfollow = unfollow;

        $scope.searchUser = {
            name: $routeParams.name
        };

        get_tweets();
        get_own_tweets();
        getFollowing();
        getFollowers();
        getUsers();

        function search(name) {
            $location.path('/search/' + name);
        }

        function get_tweets() {
            TweetService
                .get_tweets($scope.user.username)
                .success((data) => {
                    $scope.tweets = data
                });
        }

        function get_own_tweets() {
            TweetService
                .get_own_tweets($scope.user.username)
                .success((data) => {
                    $scope.ownTweets = data
                });
        }

        function get_comments(tweetId) {
            TweetService
                .get_comments(tweetId)
                .success((data) => {
                    console.log(data);
                    $scope.comments = data
                });
        }

        function getFollowing() {
            TweetService
                .getFollowing($scope.user.username)
                .success((data) => {
                    $scope.following = data
                });
        }

        function getFollowers() {
            TweetService
                .getFollowers($scope.user.username)
                .success((data) => {
                    $scope.followers = data
                });
        }

        function getUsers() {
            TweetService
                .getUsers($scope.user.username)
                .success((data) => {
                    $scope.otherUsers = data
                });
        }

        function getCurrentTweet(tweet) {
            console.log(tweet);
            $scope.currentTweet = {
                tweetId     : tweet.tweetId,
                authorName  : tweet.authorName,
                content     : tweet.content,
                timeCreated : tweet.timeCreated,
                noOfLikes   : tweet.noOfLikes,
                likedBy     : tweet.likedBy
            };
            get_comments(tweet.tweetId);
        }

        function add_tweet(tweet) {
            TweetService
                .add_tweet(tweet);
            $route.reload();
        }

        function update_tweet(tweet) {
            TweetService
                .update_tweet(tweet);
            $route.reload();
        }

        function delete_tweet(tweetId) {
            TweetService
                .delete_tweet(tweetId);
            $route.reload();
        }

        function isLiked(tweet) {
            if(tweet.likedBy != null) {
                return true
            } else {
                return false
            }
        }

        function likeTweet(tweet) {
            TweetService
                .likeTweet(tweet);
            $route.reload();
        }

        function unlikeTweet(tweet) {
            TweetService
                .unlikeTweet(tweet);
            $route.reload();
        }

        function comment(contentComment) {
            let data = {
                contentComment : contentComment,
                accountName : $scope.user.username,
                tweetContent : $scope.currentTweet.tweetId,
                noOfLikes : 0,
                likedBy : null
            }

            TweetService
                .comment(data);
            $route.reload();
        }

        function isLikedComment(comment) {
            if(comment.likedBy != null) {
                return true
            } else {
                return false
            }
        }

        function likeComment(comment) {
            TweetService
                .likeComment(comment);
            $route.reload();
        }

        function unlikeComment(comment) {
            TweetService
                .unlikeComment(comment);
            $route.reload();
        }

        function goToProfile(username) {
            if (username == $scope.user.username) {
                $location.path('/profile');
            } else {
                $location.path('/profile/' + username);
            }
        }

        function follow(user) {
            TweetService
                .follow(user);
            $route.reload();
        }

        function unfollow(followId) {
            TweetService
                .unfollow(followId);
            $route.reload();
        }

    }
})();