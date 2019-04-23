var mobile = require('./../frameworks/login');
var config = require('./../dataconfig');
var data = config.confData;
var async = require('async');
var cap = require('./../capabilities');
var app = require('./../app');
var logger = require('./../logging')

describe('SanityTests',function(){
	before(function(done){
		mobile.launchapp(cap.android45, app.uportAndroidApp, done); //App is gotten from app.js
		logger.gettestname('Login', 'App SanityTests');
	});

	it('Create Identity',function(done){
		async.series([
			function(callback){
				mobile.createidentity(data.splash, data.login, data.user, data.home, done, callback)
			}
		], done)
	});

	after(function(done){
		mobile.closeapp(done);
	});
});