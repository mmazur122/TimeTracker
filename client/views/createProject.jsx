"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.createProject = React.createClass({
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
        return {currentDraft: [], title: "Untitled"};
    },
    componentDidMount() {
        if (!_.isEmpty(this.data)) {
            this.setState({currentDraft: this.data.steps, title: this.data.title});
        }
    },
    componentDidUpdate() {
        $("#sortable").sortable({
            placeholder: "highlight",
            start: function (event, ui) {
                ui.item.toggleClass("highlight");
            },
            stop: function (event, ui) {
                ui.item.toggleClass("highlight");
            }
        });
        $("#sortable").disableSelection();
    },
    renderList() {
        var _markup = [];

        _.each(this.state.currentDraft, (step, index) => {
            _markup.push(<li key={index}>{step.stepName}<i onClick={this.removeRow.bind(this, index)} style={{"paddingLeft": 20}} className="glyphicon glyphicon-remove"></i></li>)
        });

        var _steps = _markup.map((node) => {
            return node;
        });
        return _steps
    },
    removeRow(stepIndex) {
        var _currentSteps = this.state.currentDraft;
        _currentSteps.splice(stepIndex, 1);
        this.setState({currentDraft: _currentSteps});
    },
    addToList() {
        if (!!$("#newStep").val()) {
            var _currentSteps = this.state.currentDraft;
            _currentSteps.push({
                stepName: $("#newStep").val(),
                timeStamp: 0,
                isDone: false
            });
            this.setState({currentDraft: _currentSteps});
            $("#newStep").val("");
        }
    },
    saveProject() {
        if (this.state.currentDraft.length === 0) {
            var _errorContext = {
                title: "Error",
                messages: ["Your project is empty! You don't want to save an empty project, do you?"]
            };
            Meteor.timeTracker.modals.myModal(_errorContext);
            return;
        }
        if (this.state.title === "Untitled") {
            var _errorContext = {
                title: "Warning",
                messages: ["Please change the title of your project. "]
            };
            Meteor.timeTracker.modals.myModal(_errorContext);
            return;
        }

        var _project = {
            title: this.state.title,
            steps: this.state.currentDraft,
            userId: Meteor.userId()
        };
        if (_.isEmpty(this.data)) {
            Projects.insert(_project, function (err, records) {
                if (err) {
                    var _errorContext = {
                        title: "Saving Error",
                        messages: ["Could not save your project"]
                    };
                    Meteor.timeTracker.modals.myModal(_errorContext);
                } else {
                    FlowRouter.go("/projects");
                }
            });
        } else {
            var $set = {$set: _project};
            Projects.update({_id: this.props.projectId}, $set, function (err, records) {
                if (err) {
                    var _errorContext = {
                        title: "Saving Error",
                        messages: ["Could not save your project"]
                    };
                    Meteor.timeTracker.modals.myModal(_errorContext);
                } else {
                    FlowRouter.go("/projects");
                }
            });
        }
    },
    updateTitle(event) {
        this.setState({title: event.target.value});
    },
    cancel() {
        FlowRouter.go("/projects");
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-10 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <input id="projectTitle" className="form-control" value={this.state.title}
                                   onChange={this.updateTitle} placeholder="Project Title"/>
                        </div>
                        <div className="box-content padding">
                            <div className="braggaList welcome">
                                <ul id="sortable" className="braggaList">
                                    {this.renderList()}
                                </ul>
                                <input id="newStep" className="form-control" placeholder="Enter the next step"/>
                                <button className="btn btn-primary" onClick={this.addToList}>Add to List</button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={this.saveProject}>Save Project</button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={this.cancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});