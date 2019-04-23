var mobile = require('./../frameworks/kongapay');
var config = require('./../dataconfig');
var data = config.confData;
var async = require('async');
var cap = require('./../capabilities');
var app = require('./../app');
var logger = require('./../logging')

describe('ShoppingApp SanityTests',function(){
	before(function(done){
		mobile.launchapp(cap.android45, app.uportApp, done); //App is gotten from app.js
		logger.gettestname('Login', 'App SanityTests');
	});

	it('KongaPay App login',function(done){
		async.series([
			function(callback){
				mobile.kongapayapplogin(data.splash, data.login, data.user, data.home, done, callback)
			}
		], done)
	});

	after(function(done){
		mobile.closeapp(done);
	});
});