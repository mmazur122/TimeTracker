"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.startTracking = React.createClass({
    render() {
        return(
            <div>start Tracking</div>
        );
    }
});