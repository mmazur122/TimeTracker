"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.manageProjects = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var _data = this.data || {};
        _data.projects = Projects.find({userId: Meteor.userId()}).fetch();
        return _data;
    },
    createProject() {
        FlowRouter.go("/createProject");
    },
    editProject(projectId) {
        FlowRouter.go("/projects/editProject/" + projectId);
    },
    trackTime(projectId) {
        FlowRouter.go("/projects/startTracking/" + projectId);
    },
    getNumberOfStepsDone(index) {
        var _currentProject = this.data.projects[index];
        var _counter = 0;
        _.each(_currentProject.steps, (step) => {
            if (step.isDone) {
                _counter++;
            }
        });
        return _counter;
    },
    getTotalTime(index) {
        var _currentProject = this.data.projects[index];
        var _totalTimeStamp = 0;
        _.each(_currentProject.steps, (step) => {
            _totalTimeStamp += step.timeStamp;
        });
        return moment().hour(0).minute(0).second(_totalTimeStamp).format('HH : mm : ss');
    },
    getProjects() {
        var _markup = [];
        var _counter = 0;
        var _that = this;

        _.each(this.data.projects, (project, index) => {
            var _numberOfStepsDone = _that.getNumberOfStepsDone(index);
            var _node = <tr key={_counter++}>
                <td>{_numberOfStepsDone === project.steps.length ?
                <i className="fa fa-check"></i> :
                <i className="fa fa-times"></i>}</td>
                <td>{project.title ? project.title : "Untitled"}</td>
                <td>{_numberOfStepsDone}</td>
                <td>{project.steps.length}</td>
                <td>{_that.getTotalTime(index)}</td>
                <td><a className="btn btn-primary" onClick={this.editProject.bind(this, project._id)}>
                    Edit
                </a></td>
                <td><a className="btn btn-primary" onClick={this.trackTime.bind(this, project._id)}>Track
                    Time
                </a></td>
            </tr>;
            _markup.push(_node);
        });

        var _ret;
        _ret = _markup.map((node) => {
            return node;
        });

        return _ret;
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-10 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <h3>Here are your projects</h3>
                        </div>
                        <div className="box-content padding">
                            {this.data && this.data.projects && this.data.projects.length !== 0 ? <table className="table myTable text-center">
                                <thead>
                                <tr>
                                    <th>Done</th>
                                    <th>Title</th>
                                    <th>Steps Done</th>
                                    <th>Total Steps</th>
                                    <th>Total Time</th>
                                    <th>Edit</th>
                                    <th>Track Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.getProjects()}
                                </tbody>
                            </table> : <div className="myTable">Oops! Looks like you don't have any projects. Would you like to create one?</div>}
                            <button className="btn btn-primary pull-right createProject" onClick={this.createProject}>Create
                                Project</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});