"use strict";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var helper = require('./helper')
var logger = require('./logging')
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

module.exports = {

    driver: null,

    addDriver:function(driver){
        module.exports.driver = driver;
    },

    validateiddisplayed: function (id, label, done, callback) {
        module.exports.driver.waitForElementById(id , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementById(id).then(function (haselement) {

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementById(id).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                console.log(label + ' is displayed');
                                callback()
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

    validateidtext: function (id, label, texts, done, callback) {
        module.exports.driver.waitForElementById(id , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementById(id).then(function (haselement) {

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementById(id).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                console.log(label + ' is displayed');
                                //var textm = null;

                                module.exports.driver.elementById(id).text().then(function (txt) {
                                    //textm = txt
                                    console.log("actual text is: " + txt)
                                    console.log("expected text is: " + texts)

                                    if(txt.length > 0){
                                        if (txt === texts) {
                                            console.log("actual text is equal to expected text");
                                            callback();
                                        }
                                        else {
                                            //assert.equal(txt, texts, 'Actual text is NOT equal to expected text');
                                            assert.isTrue(txt === texts, 'Actual text is NOT equal to expected text');
                                            //logger.failureroutine(txt, texts, callback);
                                        }
                                    } else {
                                        //console.log('Text retrieved is => ' + txt)
                                        //console.log('Text length is => ' + txt.length)
                                        assert.isTrue(txt.length > 0, 'Text could not be retrieved from ' + label);
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

    validatexpathtext: function(xpath, label, texts, done, callback){
        module.exports.driver.waitForElementByXPath(xpath , 20000, function(err, el) {

            if(el > 0){
                //console.log('el is equal to => ' + el)

                module.exports.driver.hasElementByXPath(xpath).then(function (haselement) {

                    if (haselement) {
                        console.log('The element ' + label + ' exists');

                        module.exports.driver.elementByXPath(xpath).isDisplayed().then(function (displayed) {
                            if (displayed) {
                                console.log(label + ' is displayed');
                                var textm = null;

                                module.exports.driver.elementByXPath(xpath).text().then(function (txt) {
                                    //textm = txt
                                    console.log("actual text is: " + txt);
                                    console.log("expected text is: " + texts)

                                    if(txt.length > 0){
                                        if (txt === texts) {
                                            console.log("actual text is equal to expected text");
                                            callback();
                                        }
                                        else {
                                            assert.equal(txt, texts, 'Actual text is NOT equal to expected text');
                                            //logger.failureroutine(txt, texts, callback);
                                        }
                                    } else {
                                        //console.log('Text retrieved is => ' + txt)
                                        //console.log('Text length is => ' + txt.length)
                                        assert.isTrue(txt.length > 0, 'Text could not be retrieved from ' + label);
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

    validateradiobuttonisselected: function(xpath, label, done, callback){
        module.exports.driver.hasElementByXPath(xpath).then(function (haselement) {

            var msgfalse = 'The element, ' + label + ' does NOT exist';

            if (haselement) {
                console.log('The element ' + label + ' exists');

                module.exports.driver.elementByXPath(xpath).isDisplayed().then(function (displayed) {
                    if (displayed) {
                        console.log(label + ' is displayed');
                        module.exports.driver.elementByXPath(xpath).getAttribute('checked').then(function (checked) {
                            if (checked === 'true'){
                                console.log("element: "+ label +", is checked ");
                                callback();
                            }
                            else {
                                assert.equal(checked, 'true', 'Radio button was not selected');
                                //logger.failroutine(checked === 'true', 'Radio button was not selected', callback);
                            }
                        }).catch(function (err) {
                            logger.failroutine(false, err.message);
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
    }
}