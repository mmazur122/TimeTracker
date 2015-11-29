"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.globalFunctions) {
    Meteor.timeTracker.globalFunctions = {};
}

Meteor.timeTracker.globalFunctions.checkEmailIsValid = function(aString) {
    aString = aString || '';
    return aString.length > 1 && aString.indexOf('@') > -1;
};

Meteor.timeTracker.globalFunctions.checkPasswordIsValid = function(aString) {
    aString = aString || '';
    return aString.length >= 6;
};




