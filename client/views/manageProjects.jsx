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
        if (this.data && this.data.projects && this.data.projects.length !== 0) {
            _.each(this.data.projects, (project, index) => {
                var _numberOfStepsDone = _that.getNumberOfStepsDone(index);
                var _node = <li key={_counter++}>{_numberOfStepsDone === project.steps.length ?
                <i className="fa fa-li fa-check"></i> :
                <i className="fa fa-li fa-times"></i>}{project.title ? project.title : "Untitled"}
                    &nbsp;({_numberOfStepsDone}/{project.steps.length} steps done, total time spent on the
                    project: {_that.getTotalTime(index)})
                    <button className="btn btn-primary pull-right" onClick={this.editProject.bind(this, project._id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button className="btn btn-primary pull-right" onClick={this.trackTime.bind(this, project._id)}>Track
                        Time
                    </button>
                </li>;
                _markup.push(_node);
            });
        } else {
            var _node = <div key={_counter++}>
                <div>Oops! Looks like you don't have any projects. Would you like to create one?</div>
            </div>;

            _markup.push(_node);
        }

        _markup.push(<button key={_counter++} className="btn btn-primary pull-right" onClick={this.createProject}>Create
            Project</button>);
        var _ret;
        _ret = _markup.map((node) => {
            return node;
        });

        return _ret;
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-6 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <h3>Here are your projects</h3>
                        </div>
                        <div className="box-content padding">
                            <div className="braggaList welcome">
                                <ul className="fa-ul braggaList">
                                    {this.getProjects()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});