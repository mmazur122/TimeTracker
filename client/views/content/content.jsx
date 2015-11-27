"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.content = React.createClass({
    getRelevantComponent() {
        var _ret;
        switch(this.props.activeLink) {
            case "home":
                _ret = Meteor.timeTracker.reactComponents.homePage;
                break;
            case "startTracking":
                _ret = <div>inside start tracking</div>;
                break;
            case "features":
                _ret = <div>inside features</div>;
                break;
            case "login":
                _ret = Meteor.timeTracker.reactComponents.loginForm;
                break;
        }

        return _ret;
    },
    render() {
        var _component = this.getRelevantComponent() || "div";
        return (
            <div><_component /></div>
        );
    }
});