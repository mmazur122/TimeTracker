"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.homePage = React.createClass({
    render() {
        return (
            <div className="row">
                <div className="col-md-10 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <h3>Welcome to my <span className="brand">Time Tracker</span>!</h3>
                        </div>
                        <div className="box-content padding">
                            <div className="braggaList welcome">
                                <ul className="fa-ul braggaList">
                                    TimeTracker is a simple app that allows you to:
                                    <li><i className="fa fa-li fa-check"></i>
                                        Create projects
                                    </li>
                                    <li>
                                        <i className="fa fa-li fa-check"></i>
                                        Track time spent on each step
                                    </li>
                                    <li>
                                        <i className="fa fa-li fa-check"></i>
                                        Keep a list of remaining steps
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});