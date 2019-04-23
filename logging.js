var wd = require("wd")
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;

chai.use(chaiAsPromised);
var should = chai.should();
var assert = chai.assert;
var config = require('./dataconfig');
var data = config.confData;
//var desired;
//chaiAsPromised.transferPromiseness = wd.transferPromiseness;
exports.should = should;

//var webdriver = require('selenium-webdriver');
//var until = require('selenium-webdriver').until;
//var csv = require('./filestreamer');
var proc = process.title;
var fs = require('fs');
var path = require('path');
var execFile = process.argv[3];
var dir;
var repdir;
var proddir;
var filename;
var logfile;
var imgfile;
var txtArray;
//var assert = require('selenium-webdriver/testing/assert');
var async = require('async');

var config = require('./dataconfig');


module.exports = {

    driver: null,

    addDriver:function(driver){
        module.exports.driver = driver;
    },

    elementnotpresentlog:function(label, message){
        console.log(label + ' not present.');

        module.exports.takescreenshot();
        //module.exports.actualmsg(label + ' not present. Reason: ' + message);
        module.exports.actualmsg(label + ' not present.');
        module.exports.expectedmsg(label + ' should be present.');
    },

    elementnotdisplayedlog:function(label, message){

        console.log(label + ' not displayed.');

        module.exports.takescreenshot();
        //module.exports.actualmsg(label + ' not displayed. Reason: ' + message);
        module.exports.actualmsg(label + ' not displayed.');
        module.exports.expectedmsg(label + ' should be displayed.');
    },

    elementnotenabledlog:function(label, message){

        console.log(label + ' not enabled.');

        module.exports.takescreenshot();
        //module.exports.actualmsg(label + ' not enabled. Reason: ' + message);
        module.exports.actualmsg(label + ' not enabled.');
        module.exports.expectedmsg(label + ' should be enabled.');
    },

    textnotretrievedlog: function (label, message) {
        console.log('Could not retrieve text from ' + label);

        module.exports.takescreenshot();
        //module.exports.actualmsg(label + ' not enabled. Reason: ' + message);
        module.exports.actualmsg('Could not retrieve text from ' + label);
        module.exports.expectedmsg('Should be able to retrieve text from ' + label);
    },

    failroutine: function (condition, failmsg) {
        module.exports.logtoconsole(failmsg);
        module.exports.takescreenshot();
        module.exports.logtoFile(failmsg);

        //assert.isTrue(condition, 'Could not interact with object');
    },

    abortwaitforelementlog: function (label, message) {

        console.log(label + ' not found after waiting for 20 secs.');

        module.exports.takescreenshot();
        //module.exports.actualmsg(label + ' not enabled. Reason: ' + message);
        module.exports.actualmsg(label + ' not found after waiting for 20 secs.');
        module.exports.expectedmsg(label + ' should be found before 20 secs wait time is exceeded.');

        /*async.series([
            function(callback){
                module.exports.takescreenshot(callback);
            },
            function(callback) {
                module.exports.actualmsg(actual + ' :: is displayed', callback);
            },
            function(callback){
                module.exports.expectedmsg(expected + ' :: should be displayed', callback);
            },
            function(callback){
                assert.isTrue(actual === expected, 'Actual text is NOT equal to expected text');
                callback()
            }
        ], cb)*/
    },

    takescreenshot: function () {
        try {
            module.exports.logtoconsole('saving screenshot to ' + imgfile);
            module.exports.driver.takeScreenshot().then(function (data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, "");
                //module.exports.logtoconsole('base 64 data is ' + base64Data);
                fs.writeFile(imgfile, base64Data, 'base64', function (err) {
                    //fs.writeFileASync(imgfile, base64Data, 'base64', function(err) {
                    if (err) {
                        throw err;
                    }
                    /*module.exports.logtoconsole("updating the screenshot path to db");
                    var imgfilename = filename + ".png";
                    var update_arr = {
                        'file_attachments': imgfilename
                    };

                    //ATTENTION:::Make API call here!
                    db.updateBuild_Results(module.exports.build_result_id, update_arr);
                     module.exports.driver.wait(function () {
                        if (db.affectedRows != null) {
                            module.exports.logtoconsole(db.affectedRows + ' row(s) affected');
                            return true;
                        } else {
                            return false;
                        }
                    }, 500);*/
                });
            });
        } catch (e) {
            module.exports.logtoconsole("Failed to take a screenshot" + e);
        }
        module.exports.driver.sleep(10000)
    },

    logtoFile: function (message) {
        module.exports.logtoconsole("logging to file: " + logfile);
        //fs.createWriteStream(logfile);
        fs.appendFile(logfile, message + "\n", function (err) {
            if (err) {
                throw err;
            }
            /*var update_arr = {
                "file_log": message
            }
            //ATTENTION:::Make API call here!
            db.updateBuild_Results(module.exports.build_result_id, update_arr);
             module.exports.driver.wait(function () {
                if (db.affectedRows != null) {
                    module.exports.logtoconsole(db.affectedRows + ' row(s) affected');
                    return true;
                } else {
                    return false;
                }
            }, 500);*/
        });
    },

    actualmsg: function (message) {
        module.exports.logtoconsole("logging actual msg to file: " + logfile);
        //fs.createWriteStream(logfile);
        fs.appendFile(logfile, "Actual Result = " + message + "\n", function (err) {
            if (err) {
                throw err;
            }
            /*var update_arr = {
                "actual_message": message
            }
            //ATTENTION:::Make API call here!
            db.updateBuild_Results(module.exports.build_result_id, update_arr);
             module.exports.driver.wait(function () {
                if (db.affectedRows != null) {
                    module.exports.logtoconsole(db.affectedRows + ' row(s) affected');
                    return true;
                } else {
                    return false;
                }
            }, 500);*/
        });

    },

    expectedmsg: function (message) {
        module.exports.logtoconsole("logging expected msg to file: " + logfile);
        //fs.createWriteStream(logfile);
        fs.appendFile(logfile, "Expected Result = " + message + "\n\r", function (err) {
            if (err) {
                throw err;
            }
            /*var update_arr = {
                "expected_message": message
            }
            //ATTENTION:::Make API call here!
            db.updateBuild_Results(module.exports.build_result_id, update_arr);
             module.exports.driver.wait(function () {
                if (db.affectedRows != null) {
                    module.exports.logtoconsole(db.affectedRows + ' row(s) affected');
                    return true;
                } else {
                    return false;
                }
            }, 500);*/
        });
    },

    callapi: function (protocol, endpoint, validate) {
        var xhr = new XMLHttpRequest();
    
        xhr.open(protocol, endpoint, validate);
        xhr.send();
        var success = (xhr.status == "200");
        //Rafa:: Add another validation for api function success
        if (success) {
            module.exports.logtoconsole(xhr.status);
        }else{
            module.exports.failroutine(success, endpoint + ' not successful')
        }
    },

    logtoconsole: function (msg) {
        //module.exports.driver.wait(function () {
            console.log(msg);
            //return true;
        //}, 50000);
    },

    errorroutine: function (err){
        module.exports.logtoconsole("Error Occured: " + err.state);
        module.exports.takescreenshot();
        module.exports.logtoFile("Error Occured: " + err.state);
        assert(err).isTrue();
    },

    logtodataFile: function (message) {
        module.exports.logtoconsole("logging to file: " + logfile);
        // fs.createWriteStream(logfile);
        fs.appendFile(logfile, message + "\n", function (err) {
            if (err) {
                throw err;
            }
            /*
             * var update_arr = { "file_log":message }
             * db.updateBuild_Results(module.exports.build_result_id,update_arr);
             * driver.wait(function(){ if(db.affectedRows!=null){
             * module.exports.logtoconsoletoFileonlylog(db.affectedRows+' row(s) affected');
             * return true; }else{ return false; } },500);
             */
        });
    },

    /*gettestname: function (productinfo) {
        logtoconsole("getting test name");
        logtoconsole('Testname: ' + productinfo.test_name);
        logtoconsole('Suite name: ' + productinfo.suite_name);
        filename = productinfo.test_name;
        repdir ='./Reports'
        proddir='./Reports'+ path.sep+productinfo.prod_name
        suitedir=proddir+ path.sep +productinfo.suite_name+ 'logs'
        imgdir = suitedir+path.sep+ 'screenshots';
        //getexecfile();
        //console.log("repdir = ",repdir)
        createdirSync(repdir);
        createdirSync(proddir);
        createdirSync(suitedir);
        createdirSync(imgdir);



        //module.exports.clearDirSync(dir);
        logfile = suitedir + path.sep + filename + ".txt";
        imgfile = imgdir + path.sep + filename + ".png";
        deletefileSync(imgfile);
        deletefileSync(logfile);

        //module.exports.checkTestNamePresentInDB(testname, suitename);
    },*/

    gettestname: function (testname, suitename) {

        module.exports.logtoconsole("getting test name");
        module.exports.logtoconsole('Test name: ' + testname);
        module.exports.logtoconsole('Suite name: ' + suitename);
        filename = testname;
        repdir ='./Reports'
        proddir='./Reports'+ path.sep+data.productinfo.prod_name
        suitedir=proddir+ path.sep +suitename+ 'logs'
        imgdir = suitedir+path.sep+ 'screenshots';
        //getexecfile();
        //console.log("repdir = ",repdir)
        module.exports.createdirSync(repdir);
        module.exports.createdirSync(proddir);
        module.exports.createdirSync(suitedir);
        module.exports.createdirSync(imgdir);

        //module.exports.clearDirSync(dir);
        logfile = suitedir + path.sep + filename + ".txt";
        imgfile = imgdir + path.sep + filename + ".png";
        module.exports.deletefileSync(imgfile);
        module.exports.deletefileSync(logfile);

        /*module.exports.logtoconsole("getting test name");
        module.exports.logtoconsole('Testname: ' + testname);
        module.exports.logtoconsole('Suite name: ' + suitename);
        filename = testname;
        module.exports.getexecfile();
        module.exports.createdirSync('./Reports');
        module.exports.createdirSync('./Reports' + path.sep + 'screenshots');
        module.exports.createdirSync('./Reports' + path.sep + execFile + 'logs');
        basedir = './Reports';
        imgdir = './Reports' + path.sep + 'screenshots';
        dir = './Reports' + path.sep + execFile + 'logs';
        //module.exports.clearDirSync(dir);
        logfile = dir + path.sep + filename + ".txt";
        imgfile = imgdir + path.sep + filename + ".png";
        module.exports.deletefileSync(imgfile);
        module.exports.deletefileSync(logfile);*/
    },

    deletefileSync: function (filename) {
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlinkSync(filename);
                module.exports.logtoconsole("file deleted" + filename);
            }
        });
    },

    getexecfile: function () {
        if (path.basename(execFile)) {
            execFile = path.basename(execFile);
        }
        module.exports.logtoconsole("FolderName: " + execFile);
    },

    createdirSync: function (dirname) {
        fs.exists(dirname, function (exist) {
            if (!exist) {
                fs.mkdirSync(dirname);
                module.exports.logtoconsole(dirname, " Directory created");
            }
            else {
                module.exports.logtoconsole(dirname, " exists");
            }
            //Ese: return dirname and initialise it to a variable???
        });

    },

    clearDirSync: function (dirPath) {
        try {
            var files = fs.readdirSync(dirPath);
        }
        catch (e) {
            return;
        }
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        }


    },

    checkTestNamePresentInDB: function (testName, suitename) {
        //ATTENTION:::Make API call here for entire function!
        db.addDriver(driver);
        var test_id = null;
        var suite_id = null;
        db.getSuiteIdFromSuites(suitename, config.confData.testProduct);
        module.exports.driver.wait(function () {
            if (db.suiteid_data != null) {
                module.exports.logtoconsole("Checking Suite ID ::");
                var suites = db.suiteid_data
                if (typeof (suites) == 'object'
                    && Object.keys(suites).length > 0) {
                    suite_id = db.suiteid_data[0]['suite_id'];
                    module.exports.logtoconsole("SUITE ID EXITS ")
                    module.exports.logtoconsole("Suites ID is :: " + suite_id);
                } else {
                    module.exports.logtoconsole("New Suite was Inserted into Suite table");
                    var array = {
                        'suite_name': suitename,
                        'product': config.confData.testProduct}
                    db.insertNewSuiteInToSuites(array);
                    driver.wait(function () {
                        if (db.insertId != null) {
                            suite_id = db.insertId;
                            module.exports.logtoconsole("NEWLY INSERTED SUITE_ID ", suite_id);
                            return true;
                        } else {
                            return false;
                        }
                    }, 5000);
                }
                driver.wait(function () {
                    if (suite_id != null) {
                        module.exports.suite_id = suite_id;
                        return true;
                    } else {
                        return false;
                    }
                }, 4000);
                return true;
            } else {
                return false;
            }
        }, 10000);
        driver.wait(function () {
            if (module.exports.suite_id != null) {
                db.getTestBuildsFromName(testName, config.confData.testProduct, module.exports.suite_id);
                return true;
            } else {
                return false;
            }
        }, 6000);
        driver.wait(function () {
            if (db.data != null) {
                var test_builds = db.data;
                module.exports.logtoconsole('test_builds', test_builds[0]);
                if (typeof (test_builds) == 'object' && Object.keys(test_builds).length > 0) {
                    test_id = test_builds[0]['test_id'];
                    module.exports.logtoconsole("TEST ID ::: ", test_id);
                    module.exports.logtoconsole('Updating a record in Test_Build table');
                    var update_arr = {'last_executed_date': module.exports.start_time}
                    db.updateTest_Build(testName, config.confData.testProduct, update_arr, module.exports.suite_id);
                } else {
                    module.exports.logtoconsole('Inserting a record in to Test_Build table');
                    db.insertTest_Build(testName, config.confData.testProduct, module.exports.start_time, module.exports.suite_id);
                    driver.wait(function () {
                        if (db.insertId != null) {
                            test_id = db.insertId;
                            module.exports.logtoconsole("NEWLY INSERTED TEST_ID ", test_id);
                            return true;
                        } else {
                            return false;
                        }
                    }, 5000);
                }
                driver.wait(function () {
                    if (test_id != null) {
                        module.exports.build_id = test_id;
                        return true;
                    } else {
                        return false;
                    }
                }, 5000);
                driver.wait(function () {
                    if (module.exports.build_id != null) {
                        db.insertTest_Build_Results(module.exports.build_id, module.exports.browsername, module.exports.start_time);
                        driver.wait(function () {
                            if (db.insertId != null) {
                                module.exports.build_result_id = db.insertId;
                                var updateArr = {'status': 'failed'};
                                db.updateStatus_Build_Results(updateArr);
                                return true;
                            } else {
                                return false;
                            }
                        }, 5000);
                        return true;
                    } else {
                        return false;
                    }
                }, 5000);
                return true;
            } else {
                return false;
            }
        }, 5000);
    },

    updateResultsInTest_Build_Results: function (status, errMsg) {
        module.exports.logtoconsole("errMsg= ", errMsg)
        if (errMsg == 'undefined' || errMsg == null) {
            errMsg = '-';
        }
        var date1 = new Date(module.exports.start_time);
        var date2 = new Date(module.exports.getMysqlDate());
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        //ATTENTION:::Make API call here!
        var updateArr = {
            'test_end_date': db.getMysqlDate(),
            'status': status,
            'time_taken': timeDiff,
            'file_log': errMsg
        }
        try {
            module.exports.logtoconsole("Updating the Results in DB");
            module.exports.logtoconsole("updateArr = ", updateArr);
            db.updateBuild_Results(module.exports.build_result_id, updateArr);
        } catch (e) {
            module.exports.logtoconsole("Failed to update a record in DB Results Table", e);
        }
    },

    updateResultsInTest_Build: function (testName) {
        var updateArr = {};
        //ATTENTION:::Make API call here for entire function!
        db.getPassAndFailCount('passed', module.exports.build_id);
        driver.wait(function () {
            module.exports.logtoconsole("in here");
            if (db.passcount != null) {
                module.exports.passcount = db.passcount;
                return true;
            } else {
                return false;
            }
        }, 5000);
        db.getPassAndFailCount('failed', module.exports.build_id);
        driver.wait(function () {
            if (db.failcount != null) {
                module.exports.failcount = db.failcount;
                return true;
            } else {
                return false;
            }
        }, 5000);
        var lastStatus = null;
        db.getLastExecutedStatus(module.exports.build_result_id);
        driver.wait(function () {
            if (db.last_status != null) {
                lastStatus = db.last_status;
                return true;
            } else {
                module.exports.logtoconsole();
                return false;
            }
        }, 5000);
        driver.wait(function () {
            if (module.exports.failcount != null && module.exports.passcount != null) {
                module.exports.logtoconsole("here finally")
                updateArr = {
                    'total_pass': module.exports.passcount,
                    'total_failures': module.exports.failcount,
                    'last_executed_status': lastStatus}
                db.updateTest_Build(testName, config.confData.testProduct, updateArr, module.exports.suite_id);
                return true;
            } else {
                module.exports.logtoconsole("In fail and pass count ");
                return false;
            }

        }, 5000)
    },

    updateFinalResults: function (results, title, txtdata) {
        module.exports.logtoconsole("module.exports.total404menus= ", module.exports.total404menus)
        var err = null;
        var state = 'passed'
        var filelog = null

        if (module.exports.total404Pages > 0) {
            state = "failed";
        }
        if (results['state'] == 'failed') {
            state = 'failed'
        }
        if (typeof (txtdata) != 'undefined') {
            filelog = txtdata.toString();
        }
        else {
            filelog = '-'
        }
        /*
         * if(parseInt(config.confData.address.lga_csv.total_failed) > 0 ){
         * state = "failed"; }
         */
        if (module.exports.urltest_categories['failedcategory'] != 0 || module.exports.linkNotFound != 0
            || module.exports.urltest_categories['failedsubcategory'] != 0
            || module.exports.urltest_categories['failedsubsubcategory'] || module.exports.total404menus != 0) {
            state = "failed";
        }
        module.exports.logtoconsole("state= ", state)
        module.exports.logtoconsole("filelog= ", filelog)
        module.exports.updateResultsInTest_Build_Results(state, filelog);
        module.exports.updateResultsInTest_Build(title);

        // callback();
    }
}