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
        _data.projects = Projects.findOne({userId: Meteor.userId()}).projects;
        return _data;
    },
    createProject() {
        FlowRouter.go("/createProject");
    },
    getProjects() {
        var _markup = [];
        var _counter = 0;
        if (this.data && this.data.projects && this.data.projects.length !== 0) {
            _.each(this.data.projects, (project) => {
                var _node = <li key={_counter++}><i className="fa fa-li fa-check"></i>{project.title ? project.title : "Untitled"}
                    ({project.stepsDone ? project.stepsDone.length : 0}/{project.steps.length} steps done)</li>;
                _markup.push(_node);
            });
        } else {
            var _node = <div key={_counter++}>
                <p>Oops! Looks like you don't have any projects. Would you like to create one?</p>
                </div>;

            _markup.push(_node);
        }

        _markup.push(<button key={_counter++} className="btn btn-primary" onClick={this.createProject}>Create Project</button>);
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