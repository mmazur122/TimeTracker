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
    renderList() {
        var _markup = [];
        var _that = this;
        var _steps = "";
        if (!_.isEmpty(this.data)) {
            _.each(this.data.steps, (step, index) => {
                var _stepIsDone = _that.isStepDone(step);
                _markup.push(<li key={index}>{_stepIsDone ? <i className="fa fa-li fa-check"></i> : <i className="fa fa-li fa-times"></i>}{step}
                <button className="btn btn-primary" onClick={this.markAsDone.bind(this, step, _stepIsDone)}>
                    {_stepIsDone ? "Not Done" : "Done"}</button></li>)
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
                            <input id="newStep" className="form-control" placeholder="Enter the next step"/>
                            <button className="btn btn-primary" onClick={this.addToList}>Add to List</button>
                            &nbsp;
                            <button className="btn btn-primary" onClick={this.saveProject}>Save Project</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});