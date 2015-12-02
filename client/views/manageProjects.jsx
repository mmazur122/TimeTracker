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
        _data.projects = Projects.find({userId: Meteor.userId()}).projects;
        return _data;
    },
    createProject() {
        FlowRouter.go("/createProject");
    },
    getProjects() {
        var _markup = [];
        if (this.data && this.data.projects && this.data.projects.length !== 0) {
            _.each(projects, (project) => {
                var _estimatedTime = 0;
                if (project.tasks) {
                    _.each(project.tasks, (task) => {
                        _estimatedTime += task.time;
                    })
                }
                var _node = <li><i className="fa fa-li fa-check"></i>{project.name} ({project.tasks.length},
                    estimated time: {_estimatedTime > 0 ? _estimatedTime : "No time estimates entered"})</li>;
                _markup.push(_node);
            });
        } else {
            var _node = <div>
                <p>Oops! Looks like you don't have any projects. Would you like to create one?</p>
                <button className="btn btn-primary" onClick={this.createProject}>Create Project</button>
                </div>;

            _markup.push(_node);
        }

        var _ret;
        _ret =_markup.map((node) => {
            return node;
        });

        return _ret;
    },
    render() {
        return (
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
        );
    }
});