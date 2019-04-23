"use strict";
var wd = require("wd")
var validation = require('./validations')
var async = require('async')
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
var logger = require('./logging')
var ENTER_KEY = 66;

function swipe(opts) {
    var action = new wd.TouchAction(this);
    action
        .press({x: opts.startX, y: opts.startY})
        .wait(opts.duration)
        .moveTo({x: opts.endX, y: opts.endY})
        .release();
    return action.perform();
}
wd.addPromiseChainMethod('swipe', swipe);

module.exports = {

    text: [],
    driver: null,

    addDriver:function(driver){
        module.exports.driver = driver;
    },

    entertextid: function (id, label, text, done, callback) {
        module.exports.driver.hasElementById(id).then(function (haselement) {
            var msgfalse = 'The element, ' + label + ' does NOT exist';
            if (haselement) {
                console.log('The element ' + label + ' exists');

                var element = module.exports.driver.elementById(id).isDisplayed().then(function (displayed) {
                    if (displayed) {
                        console.log(label + ' displayed')

                        module.exports.driver.elementById(id).isEnabled().then(function (enabled) {
                            if (enabled) {
                                console.log(label + ' enabled');

                                module.exports.driver.elementById(id).click().then(function (err) {
                                    console.log("Sending text to element: " + label + "........");
                                    module.exports.driver.elementById(id).setText(text).then(function (err) {
                                        console.log("element: " + label + ", received text successfully");
                                        callback();
                                    }).catch(function (err) {
                                        logger.failroutine(false, err.message);
                                        //done(err.message)
                                        done(err)
                                    })
                                }).catch(function (err) {
                                    logger.failroutine(false, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            } else {
                                assert.isTrue(enabled, label + ' not enabled');
                                //logger.elementnotenabledlog(enabled, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotenabledlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })

                    } else {
                        assert.isTrue(displayed, label + ' not displayed');
                        //logger.elementnotdisplayedlog(displayed, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotdisplayedlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            }
            else {
                assert.isTrue(haselement, label + ' not present');
                //logger.elementnotpresentlog(haselement, label, callback);
            }
        }).catch(function (err) {
            logger.elementnotpresentlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    entertextxpath: function (xpath, label, text, done, callback) {
        module.exports.driver.hasElementByXPath(xpath).then(function (haselement) {

            if (haselement) {
                console.log('The element ' + label + ' exists');

                module.exports.driver.elementByXPath(xpath).isDisplayed().then(function (displayed) {
                    if (displayed) {
                        console.log(label + ' displayed')

                        module.exports.driver.elementByXPath(xpath).isEnabled().then(function (enabled) {
                            if (enabled) {
                                console.log(label + ' enabled');

                                module.exports.driver.elementByXPath(xpath).click().then(function (err) {
                                    console.log("Sending text to element: " + label + "........");
                                    module.exports.driver.elementByXPath(xpath).setText(text).then(function (err) {
                                        console.log("element: " + label + ", received text successfully");
                                        callback();
                                    }).catch(function (err) {
                                        logger.failroutine(false, err.message);
                                        //done(err.message)
                                        done(err)
                                    })
                                }).catch(function (err) {
                                    logger.failroutine(false, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            } else {
                                assert.isTrue(enabled, label + ' not enabled');
                                //logger.elementnotenabledlog(enabled, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotenabledlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })

                    } else {
                        assert.isTrue(displayed, label + ' not displayed');
                        //logger.elementnotdisplayedlog(displayed, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotdisplayedlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            }
            else {
                assert.isTrue(haselement, label + ' not present');
                //logger.elementnotpresentlog(haselement, label, callback);
            }
        }).catch(function (err) {
            logger.elementnotpresentlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    clickid: function (id, label, done, callback) {
        module.exports.driver.hasElementById(id).then(function (haselement) {

            if (haselement) {
                console.log('The element ' + label + ' exists');

                module.exports.driver.elementById(id).isDisplayed().then(function (displayed) {
                    if (displayed) {
                        console.log(label + ' is displayed');

                        module.exports.driver.elementById(id).isEnabled().then(function (enabled) {
                            if (enabled) {
                                console.log(label + ' is enabled');

                                module.exports.driver.elementById(id).click().then(function (err) {
                                    console.log("element: " + label + ", clicked successfully");
                                    callback();
                                }).catch(function (err) {
                                    logger.failroutine(false, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            } else {
                                assert.isTrue(enabled, label + ' not enabled');
                                //logger.elementnotenabledlog(enabled, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotenabledlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })

                    } else {
                        assert.isTrue(displayed, label + ' not displayed');
                        //logger.elementnotdisplayedlog(displayed, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotdisplayedlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            }
            else {
                assert.isTrue(haselement, label + ' not present');
                //logger.elementnotpresentlog(haselement, label, callback);
            }
        }).catch(function (err) {
            logger.elementnotpresentlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    clickxpath: function (xpath, label, done, callback) {
        module.exports.driver.waitForElementByXPath(xpath , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementByXPath(xpath).then(function (haselement) {

                    var msgfalse = 'The element, ' + label + ' does NOT exist';

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementByXPath(xpath).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                module.exports.driver.elementByXPath(xpath).isEnabled().then(function (enabled) {
                                    if (enabled) {
                                        console.log(label + ' is enabled');

                                        module.exports.driver.elementByXPath(xpath).click().then(function (err) {
                                            console.log("element: " + label + ", clicked successfully");
                                            callback();
                                        }).catch(function (err) {
                                            logger.failroutine(false, err.message);
                                            //done(err.message)
                                            done(err)
                                        })
                                    } else {
                                        assert.isTrue(enabled, label + ' not enabled');
                                        //logger.elementnotenabledlog(enabled, label, callback);
                                    }
                                }).catch(function (err) {
                                    logger.elementnotenabledlog(label, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            }
                            else {
                                assert.isTrue(displayed, label + ' not displayed');
                                //logger.elementnotdisplayedlog(displayed, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotdisplayedlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })
                    }
                    else {
                        assert.isTrue(haselement, label + ' not present');
                        //logger.elementnotpresentlog(haselement, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotpresentlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            } else {
                //console.log('el is equal to => ' + el)
                assert.isTrue(el > 0, 'Element not found after waiting for a certain amount of time');
            }
        }).catch(function (err) {
            logger.abortwaitforelementlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    gettextxpath: function (xpath, label, key, done, callback) {
        module.exports.driver.waitForElementByXPath(xpath , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementByXPath(xpath).then(function (haselement) {

                    //var msgfalse = 'The element, ' + label + ' does NOT exist';

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementByXPath(xpath).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                console.log(label + ' is displayed');
                                //var textm = null;

                                module.exports.driver.elementByXPath(xpath).text().then(function (txt) {
                                    if (txt.length > 0){
                                        //textm = txt

                                        if (key === 'prodname') {
                                            module.exports.text['prodname'] = txt;
                                            console.log("actual text is: " + module.exports.text['prodname']);
                                            callback();
                                        } else if (key === 'storename') {
                                            module.exports.text['storename'] = txt;
                                            console.log("actual text is: " + module.exports.text['storename']);
                                            callback();
                                        } else {
                                            module.exports.text['text'] = txt;
                                            console.log("actual text is: " + module.exports.text['text']);
                                            callback();
                                        }

                                    }
                                    else {
                                        assert.isTrue(txt.length > 0, 'Text could not be retrieved from ' + label);
                                        //logger.failroutine(txt != null, 'Element has no text', callback);
                                    }
                                }).catch(function (err) {
                                    logger.textnotretrievedlog(label, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            }
                            else {
                                assert.isTrue(displayed, label + ' not displayed');
                                //logger.elementnotdisplayedlog(displayed, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotdisplayedlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })
                    }
                    else {
                        assert.isTrue(haselement, label + ' not present');
                        //logger.elementnotpresentlog(haselement, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotpresentlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            } else {
                //console.log('el is equal to => ' + el)
                assert.isTrue(el > 0, 'Element not found after waiting for a certain amount of time');
            }
        }).catch(function (err) {
            logger.abortwaitforelementlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    gettextid: function (id, label, key, done, callback) {
        module.exports.driver.waitForElementById(id , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementById(id).then(function (haselement) {

                    //var msgfalse = 'The element, ' + label + ' does NOT exist';

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementById(id).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                console.log(label + ' is displayed');
                                //var textm = null;

                                module.exports.driver.elementById(id).text().then(function (txt) {
                                    if (txt.length > 0){
                                        //textm = txt

                                        if (key === 'prodname') {
                                            module.exports.text['prodname'] = txt;
                                            console.log("actual text is: " + module.exports.text['prodname']);
                                            callback();
                                        } else if (key === 'storename') {
                                            module.exports.text['storename'] = txt;
                                            console.log("actual text is: " + module.exports.text['storename']);
                                            callback();
                                        } else {
                                            module.exports.text['text'] = txt;
                                            console.log("actual text is: " + module.exports.text['text']);
                                            callback();
                                        }

                                    }
                                    else {
                                        assert.isTrue(txt.length > 0, 'Text could not be retrieved from ' + label);
                                        //logger.failroutine(txt != null, 'Element has no text', callback);
                                    }
                                }).catch(function (err) {
                                    logger.textnotretrievedlog(label, err.message);
                                    //done(err.message)
                                    done(err)
                                })
                            }
                            else {
                                assert.isTrue(displayed, label + ' not displayed');
                                //logger.elementnotdisplayedlog(displayed, label, callback);
                            }
                        }).catch(function (err) {
                            logger.elementnotdisplayedlog(label, err.message);
                            //done(err.message)
                            done(err)
                        })
                    }
                    else {
                        assert.isTrue(haselement, label + ' not present');
                        //logger.elementnotpresentlog(haselement, label, callback);
                    }
                }).catch(function (err) {
                    logger.elementnotpresentlog(label, err.message);
                    //done(err.message)
                    done(err)
                })
            } else {
                //console.log('el is equal to => ' + el)
                assert.isTrue(el > 0, 'Element not found after waiting for a certain amount of time');
            }
        }).catch(function (err) {
            logger.abortwaitforelementlog(label, err.message);
            //done(err.message)
            done(err)
        })
    },

    

    /** navigatetohomescreen: function(splash, home, done, cb){
        async.series([
            function(callback){
                module.exports.clickid(splash['continueid'], 'Continue without signing in', done, callback)
            },
            function(callback){
                validation.validateidtext(home['searchlabelid'], 'Home screen', 'What are you looking for today?', done, callback)
            }
        ], cb)
    },***/

    
    clickdevicekey: function(code, done, callback){

        module.exports.driver.pressDeviceKey(code).then(function (err) {
            console.log('Device key pressed!')
            callback();
        }).catch(function(err){done(err)})
    },

    navigateback: function(done, callback){
        module.exports.driver.back().then(function(err){
            callback();
        }).catch(function(err){done(err)})
    },

    scrollto: function(startx, starty, endx, endy, dur, done, callback){
        module.exports.driver.sleep(500).then(function(){
            //console.log('Waited 5 secs and scrolled')
            module.exports.driver.swipe({startX: startx, startY: starty,  endX: endx, endY: endy, duration: dur}).then(function(){
                console.log('Waited 5 secs and scrolled')
                callback();
            }).catch(function(err){done(err)})
        })
    },

    wait: function(time, done, callback){
         module.exports.driver.sleep(time).then(function(){
         console.log('Waited '+ time/1000 +' secs')
         callback();
         }).catch(function(err){done(err)})
    }
}