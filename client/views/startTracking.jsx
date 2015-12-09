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
    runStopWatch: null,
    markAsDone(index) {
        var _currentProject = Projects.findOne({_id: this.props.projectId});
        var _steps = _currentProject.steps;
        _steps[index].isDone = !_steps[index].isDone;
        var $set = {$set: {steps: _steps}};
        Projects.update({_id: this.props.projectId}, $set);
        var _relevantStopWatch = this.refs[index];
        if (_relevantStopWatch.state.clockIsRunning) {
            Meteor.clearInterval(_relevantStopWatch.runStopWatch);
            _relevantStopWatch.updateStepTimeStamp();
            _relevantStopWatch.setState({clockIsRunning: !_relevantStopWatch.state.clockIsRunning});
        }
        if (this.allStepsAreDone(_steps)) {
            var _errorContext = {title: "Congratulations", messages: ["You have just completed all steps in your project - " + this.data.title + "!"]};
            Meteor.timeTracker.modals.authenticationError(_errorContext);
        }
    },
    allStepsAreDone(steps) {
        return _.every(steps, (step) => {
            return step.isDone;
        })
    },
    isStepDone(index) {
        return this.data.steps[index].isDone;
    },
    renderList() {
        var _markup = [];
        var _that = this;
        var _steps = "";
        if (!_.isEmpty(this.data)) {
            _.each(this.data.steps, (step, index) => {
                var _stepIsDone = _that.isStepDone(index);
                //_markup.push(<li key={index}>{_stepIsDone ? <i className="fa fa-li fa-check"></i> : <i className="fa fa-li fa-times"></i>}{step.stepName}
                //<button className="btn btn-primary" onClick={this.markAsDone.bind(this, index)}>
                //    {_stepIsDone ? "Not Done" : "Done"}</button><StopWatch ref={index} stepIndex={index} timeStamp={step.timeStamp} isDone={step.isDone} projectId={this.props.projectId} /></li>)

                _markup.push(<tr key={index}><td className="col-md-1">{_stepIsDone ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>}</td>
                <td className="col-md-5">{step.stepName}</td><td className="col-md-2"><StopWatch ref={index} stepIndex={index} timeStamp={step.timeStamp} isDone={step.isDone} projectId={this.props.projectId} /></td>
                <td className="col-md-1"><button className="btn btn-primary" onClick={this.markAsDone.bind(this, index)}>{_stepIsDone ? "Not Done" : "Done"}</button></td></tr>)
            });

            _steps = _markup.map((node) => {
                return node;
            });
        }
        return _steps;
    },
    backToProjects() {
        FlowRouter.go("/projects");
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-10 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <h3>{!_.isEmpty(this.data) ? this.data.title : "Loading your project"}</h3>
                        </div>
                        <div className="box-content padding">
                            <table className="table myTable">
                                <thead className="noHeaderTable">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderList()}
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={this.backToProjects}>Back to Projects</button>
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
            this.updateStepTimeStamp();
        } else {
            var _that = this;
            this.runStopWatch = Meteor.setInterval(() => {
                _that.setState({currentTimeStamp: _that.state.currentTimeStamp + 1});
            }, 1000);
        }
        this.setState({clockIsRunning: !this.state.clockIsRunning});
    },
    updateStepTimeStamp() {
        var _currentProject = Projects.findOne({_id: this.props.projectId});
        var _steps = _currentProject.steps;
        _steps[this.props.stepIndex].timeStamp = this.state.currentTimeStamp;
        var $set = {$set: {steps: _steps}};
        Projects.update({_id: this.props.projectId}, $set);
    },
    componentWillUnmount() {
        this.updateStepTimeStamp();
    },
    formatTimeStamp() {
        return moment().hour(0).minute(0).second(this.state.currentTimeStamp).format('HH : mm : ss');
    },
    render() {
        return (
            <div className="row customDiv">
                <div>{this.formatTimeStamp()}</div>&nbsp;&nbsp;
                {this.props.isDone ? "" : <button className="btn btn-primary" onClick={this.manageStopWatch}>{this.state.clockIsRunning ? "Stop" : "Start"}</button>}
            </div>
        );
    }
});