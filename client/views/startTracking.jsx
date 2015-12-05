"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.startTracking = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var _data = {};
        if (this.props.projectId) {
            var _project = Projects.findOne({_id: this.props.projectId});
            _data = _project ? _project : {};
        }
        return _data;
    },
    getInitialState() {
        return {stepBeingTimed: ""};
    },
    runStopWatch: null,
    markAsDone(stepName, stepIsDone) {
        var _currentProject = Projects.findOne({_id: this.props.projectId});
        var _stepsDone = _currentProject.stepsDone;
        if (!stepIsDone) {
            _stepsDone.push(stepName);
        } else {
            _stepsDone.splice(_stepsDone.indexOf(stepName), 1);
        }
        var $set = {$set: {stepsDone: _stepsDone}};
        Projects.update({_id: this.props.projectId}, $set);
    },
    isStepDone(stepName) {
        return this.data.stepsDone.indexOf(stepName) > -1;
    },
    getTimeEntryInput() {

    },
    renderList() {
        var _markup = [];
        var _that = this;
        var _steps = "";
        if (!_.isEmpty(this.data)) {
            _.each(this.data.steps, (step, index) => {
                var _stepIsDone = _that.isStepDone(step);
                _markup.push(<li key={index}>{_stepIsDone ? <i className="fa fa-li fa-check"></i> : <i className="fa fa-li fa-times"></i>}{step}
                <button className="btn btn-primary" onClick={this.markAsDone.bind(this, step, _stepIsDone)}>
                    {_stepIsDone ? "Not Done" : "Done"}</button><StopWatch timeStamp={0} /></li>)
            });

            _steps = _markup.map((node) => {
                return node;
            });
        }
        return _steps;
    },
    render() {
        return (
            <div className="col-md-6 center">
                <div className="box box-bordered box-color">
                    <div className="box-title">
                        <h3>{!_.isEmpty(this.data) ? this.data.title : "Loading your project"}</h3>
                    </div>
                    <div className="box-content padding">
                        <div className="braggaList welcome">
                            <ul className="braggaList fa-ul">
                                {this.renderList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var StopWatch = React.createClass({
    getInitialState() {
        return ({clockIsRunning: false, currentTimeStamp: this.props.timeStamp});
    },
    runStopWatch: null,
    manageStopWatch() {
        if (this.state.clockIsRunning) {
            Meteor.clearInterval(this.runStopWatch);
        } else {
            var _that = this;
            this.runStopWatch = Meteor.setInterval(() => {
                console.log("refreshing state");
                _that.setState({currentTimeStamp: _that.state.currentTimeStamp + 1});
            }, 1000);
        }
        this.setState({clockIsRunning: !this.state.clockIsRunning});
    },
    formatTimeStamp() {
        console.log("timestamp to be displayed: ", moment().hour(0).minute(0).second(this.state.currentTimeStamp).format('HH : mm : ss'));
        return moment().hour(0).minute(0).second(this.state.currentTimeStamp).format('HH : mm : ss');
    },
    render() {
        console.log("rendering stopwatch");
        return (
            <div>
                <div>{this.formatTimeStamp()}</div><button className="btn btn-primary" onClick={this.manageStopWatch}>{this.state.clockIsRunning ? "Stop" : "Start"}</button>
            </div>
        );
    }
});