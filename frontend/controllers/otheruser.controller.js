(() => {
    'use strict';

    angular
        .module('app')
        .controller('OtherUserController', OtherUserController);

    OtherUserController.$inject = ['$scope', '$route', '$location', '$routeParams', 'TweetService'];

    function OtherUserController($scope, $route, $location, $routeParams, TweetService) {
        $scope.user = JSON.parse(localStorage.userdata);
        $scope.thisUser = $routeParams.username;
        $scope.userData = {};
        $scope.ownTweets = [];
        $scope.comments = [];
        $scope.currentTweet = {};
        $scope.following = [];
        $scope.followers = [];

        $scope.getCurrentTweet = getCurrentTweet;
        $scope.isLiked = isLiked;
        $scope.likeTweet = likeTweet;
        $scope.unlikeTweet = unlikeTweet;
        $scope.comment = comment;
        $scope.isLikedComment = isLikedComment;
        $scope.likeComment = likeComment;
        $scope.unlikeComment = unlikeComment;
        $scope.getFollowing = getFollowing;
        $scope.getFollowers = getFollowers;
        $scope.getUserData = getUserData;
        $scope.goToProfile = goToProfile;

        getUserData();
        get_own_tweets();
        getFollowing();
        getFollowers();

        function getUserData() {
            TweetService
                .getUserData($scope.thisUser)
                .success((data) => {
                    $scope.userData = data[0]
                });
        }

        function get_own_tweets() {
            TweetService
                .get_own_tweets($scope.thisUser)
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
                .getFollowing($scope.thisUser)
                .success((data) => {
                    $scope.following = data
                });
        }

        function getFollowers() {
            TweetService
                .getFollowers($scope.thisUser)
                .success((data) => {
                    $scope.followers = data
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
                tweetContent : $scope.currentTweet.tweetId
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
            $location.path('/profile/' + username);
        }

    }
})();