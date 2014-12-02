/**
 * Lead Author: Tawanda 
 *
 * Test module for modifying taste profile.
 */
var request = require('request');
var expect = require("chai").expect;
var SERVER_ADDRESS = "http://localhost:8080/"
var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = require("../config/secrets").MONGO_URL;
var token = "";

describe("Taste and Dishes routing", function(){
	before(function(done){
		this.timeout(10000);
		var request_body = {"username" : "menyou", "password" : "menyou"};
		request({
			"url": SERVER_ADDRESS + "api/auth/register",
			"method": "POST",
			"json": true,
			"body": request_body
		}, function(err, httpResponse, body) {
		  if (err) {
		    throw err;
		  } else {
		  	token = body.content.token;
		  	done();
		  }
		});
	});

	describe("Taste Profile", function(){
		it("adds items to the taste profile", function(done){
			this.timeout(10000);
			var request_body = {
				"likes" : { "add" : ["fish"], "remove" : []},
				"dislikes" : { "add" : ["spicy"], "remove" : []},
				"forbidden" : { "add" : ["pork"], "remove" : []}
			};

			request({
				"url": SERVER_ADDRESS + "api/taste",
				"method": "PUT",
				"json": true,
				"body": request_body,
				"headers" : {
					"Authorization" : "Bearer " + token
				}
			}, function(err, httpResponse, body) {
			  if (err) {
			    throw err;
			  } else {
			  	expect(body).to.have.property("success");
			  	expect(body).to.have.property("message");
			  	expect(body).to.have.property("content");
			  	expect(body.success).to.eql(true);
			  	expect(body.message).to.eql("Updated taste profile");
			  	expect(body.content.likes[0]).to.eql("fish");
			  	expect(body.content.dislikes[0]).to.eql("spicy");
			  	expect(body.content.forbidden[0]).to.eql("pork");
			  	done();
			  }
			});//request
		});// it adds taste

		it("gets the taste profile", function(done){
			this.timeout(10000);
			request({
				"url": SERVER_ADDRESS + "api/taste",
				"method": "GET",
				"json": true,
				"headers" : {
					"Authorization" : "Bearer " + token
				}
			}, function(err, httpResponse, body) {
			  if (err) {
			    throw err;
			  } else {
			  	expect(body).to.have.property("success");
			  	expect(body).to.have.property("message");
			  	expect(body).to.have.property("content");
			  	expect(body.success).to.eql(true);
			  	expect(body.message).to.eql("Got taste profile");
			  	expect(body.content.likes[0]).to.eql("fish");
			  	expect(body.content.dislikes[0]).to.eql("spicy");
			  	expect(body.content.forbidden[0]).to.eql("pork");
			  	done();
			  }
			});//request
		});// it gets taste

		it("removes items from the taste profile", function(done){
			this.timeout(10000);
			var request_body = {
				"likes" : { "add" : [], "remove" : ["fish"]},
				"dislikes" : { "add" : [], "remove" : ["spicy"]},
				"forbidden" : { "add" : [], "remove" : ["pork"]}
			};

			request({
				"url": SERVER_ADDRESS + "api/taste",
				"method": "PUT",
				"json": true,
				"body": request_body,
				"headers" : {
					"Authorization" : "Bearer " + token
				}
			}, function(err, httpResponse, body) {
			  if (err) {
			    throw err;
			  } else {
			  	expect(body.content.likes.length).to.eql(0);
			  	expect(body.content.dislikes.length).to.eql(0);
			  	expect(body.content.forbidden.length).to.eql(0);
			  	done();
			  }
			});//request
		});// it removes taste

	});// describes Taste Profile

	describe("Recommendations", function(){
		this.timeout(10000);
		it("gets recommendations from server", function(done){

			request({
				"url": SERVER_ADDRESS + "api/dishes",
				"method": "GET",
				"json": true,
				"qs": {
					"lat": 42.3783904,
					"lon": -71.1129097,
					"radius": 500
				},
				"headers" : {
					"Authorization" : "Bearer " + token
				}
			}, function(err, httpResponse, body) {
			  if (err) {
			    console.log(err);
          done();
			  } else {
			  	expect(body).to.have.property("success");
			  	expect(body).to.have.property("message");
			  	expect(body).to.have.property("content");
			  	expect(body.success).to.eql(true);
			  	expect(body.message).to.eql("Recommended meals");
			  	body.content.forEach(function(dish) {
		        expect(dish).to.have.property("name");
		        expect(dish).to.have.property("description");
		        expect(dish).to.have.property("price");
		        expect(dish).to.have.property("restaurant");
		      });
			  	done();
			  }
			});//request
		});//it
	});//describe

	after(function(done){
		this.timeout(10000);
    MongoClient.connect(MONGO_URL, function(err, db) {
      var collection = db.collection("users");
      collection.remove({"username": "menyou"}, function(err, result) {
        done();
        db.close();
      });
    });
	});

});
