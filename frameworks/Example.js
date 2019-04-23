"use strict";
var wd = require("wd"),
	fs = require('fs'),
	path = require('path'),
	_ = require('underscore');
var async = require('async');

var execFile = process.argv[3];
var dir;
var filename;
var logfile;
var imgfile;

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;

chai.use(chaiAsPromised);
var should = chai.should();
var assert = chai.assert;
var desired;
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
exports.should = should;

var browser = wd.promiseChainRemote("localhost", 4723);

var helper = require('../helper')
var validation = require('../validations')
var logger = require('../logging')

module.exports = {

	launchapp: function(device,app,done) {
		var desired = module.exports.config(device,app);

		browser.init(desired).setCommandTimeout(30000).setImplicitWaitTimeout(30000).nodeify(done);
		helper.addDriver(browser)
		validation.addDriver(browser)
		logger.addDriver(browser)

		console.log('Launching App...');
	},

	config: function(device,app){
		desired = device
		desired.app = app;
		return desired;
	},

	closeapp: function(done){
		browser.quit(function (err) {
			console.log("Shutting down app....");
		}).nodeify(done);
	},

	createidentity: function (splashscreen, loginscreen, user, homescreen, done, cb){
		async.series([
			function(callback){

				//Click Get Started button(Verify button is present and click it)
				//verify onboarding screens are displayed
				//Click Continue button
				//enter name
				//tap return to remove keyboard
				//
				//accept t &C 
				//accpt pp
				//tap create id
				//verify button disabled and label changed
				//verify homepage is displayed
				//verify get started is displayed
				//verify verify tryuport modal is displayed
				//verify menu buttons are dispayed.
				//verify scanner button is displayed
				validation.validatexpathtext(splashscreen['loginbtnxpath'], 'Log In button', 'Log In', done, callback)
			
			}
		], cb)
	}

	


	
}