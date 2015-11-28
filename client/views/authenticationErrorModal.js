"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.modals) {
    Meteor.timeTracker.modals = {};
}

Template.authenticationError.helpers({
    errorMessage() {
        var _ret = "";
        _.each(Session.get("errorMessages"), (errorMessage) => {
            _ret += errorMessage + "\n";
        });
        return _ret;
    }
});

Meteor.timeTracker.modals.authenticationError = function (errorContext) {
    var _opts = {
        withCancel: false,
        closeOnOk: true,
        okLabel: "Close"
    };

    var _title = errorContext.title;
    Session.set("errorMessages", errorContext.messages);
    window.timeTracker.modals.initAndShow(Template.authenticationError, _title, _opts);
};