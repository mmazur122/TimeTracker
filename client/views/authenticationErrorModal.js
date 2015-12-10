"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.modals) {
    Meteor.timeTracker.modals = {};
}

Template.myModal.helpers({
    message() {
        var _ret = "";
        _.each(Session.get("messages"), (message) => {
            _ret += message + "\n";
        });
        return _ret;
    }
});

Meteor.timeTracker.modals.myModal = function (context) {
    var _opts = {
        withCancel: false,
        closeOnOk: true,
        okLabel: "Close"
    };

    var _title = context.title;
    Session.set("messages", context.messages);
    window.timeTracker.modals.initAndShow(Template.myModal, _title, _opts);
};