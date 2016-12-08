DROP DATABASE IF EXISTS twitterLike;
CREATE DATABASE IF NOT EXISTS twitterLike;
USE twitterLike;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE account(
	username VARCHAR(20) NOT NULL,
	email VARCHAR(50) NOT NULL,
	loginPassword VARCHAR(32) NOT NULL,
	name VARCHAR(32) NOT NULL,
	CONSTRAINT account_username_pk PRIMARY KEY(username),
	CONSTRAINT account_email_uk UNIQUE KEY(email)
);

CREATE TABLE follow(
	followId INT(5) AUTO_INCREMENT NOT NULL,
	following VARCHAR(20),
	follower VARCHAR(20),
	CONSTRAINT follow_followId_pk PRIMARY KEY(followId),
	CONSTRAINT follow_following_fk FOREIGN KEY(following) REFERENCES account(username),
	CONSTRAINT follow_follower_fk FOREIGN KEY(follower) REFERENCES account(username)
);
	
CREATE TABLE tweet(
	tweetId INT(5) AUTO_INCREMENT NOT NULL,
	authorName VARCHAR(20) NOT NULL,
	content VARCHAR(140) NOT NULL,
	timeCreated DATETIME NOT NULL,
	noOfLikes INT(5) NOT NULL,
	likedBy VARCHAR(20),
	CONSTRAINT tweet_tweetId_pk PRIMARY KEY(tweetId),
	CONSTRAINT tweet_tweetId_uk UNIQUE KEY(tweetId),
	CONSTRAINT tweet_authorName_fk FOREIGN KEY(authorName) REFERENCES account(username)
);

CREATE TABLE comment(
	commentId INT(5) AUTO_INCREMENT NOT NULL,
	contentComment VARCHAR(140) NOT NULL,
	timeCreated DATETIME NOT NULL,
	accountName VARCHAR(20) NOT NULL,
	tweetContent INT(5),
	noOfLikes INT(5) NOT NULL,
	likedBy VARCHAR(20),
	CONSTRAINT comment_commentId_pk PRIMARY KEY(commentId),
	CONSTRAINT comment_commentId_uk UNIQUE KEY(commentId),
	CONSTRAINT comment_accountName_fk FOREIGN KEY(accountName) REFERENCES account(username),
	CONSTRAINT comment_tweetContent_fk FOREIGN KEY(tweetContent) REFERENCES tweet(tweetId)
);
