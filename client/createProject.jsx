"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.createProject = React.createClass({
    getInitialState() {
        return {currentDraft: [], title: "Untitled"};
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
            _markup.push(<li key={index}>{step}<i onClick={this.removeRow.bind(this, index)} style={{"paddingLeft": 20}} className="glyphicon glyphicon-remove"></i></li>)
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
            _currentSteps.push($("#newStep").val());
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
            Meteor.timeTracker.modals.authenticationError(_errorContext);
            return;
        }
        if ($("#projectTitle").html() === "Untitled") {
            var _errorContext = {
                title: "Warning",
                messages: ["Please change the title of your project by clicking on the title."]
            };
            Meteor.timeTracker.modals.authenticationError(_errorContext);
            return;
        }

        var _project = {
            title: $("#projectTitle").val(),
            steps: this.state.currentDraft,
            userId: Meteor.userId(),
            stepsDone: []
        };
        //var _set = {$set: _project;
        Projects.insert(_project,  function(err, records){
            if (err) {
                var _errorContext = {
                    title: "Saving Error",
                    messages: ["Could not save your project"]
                };
                Meteor.timeTracker.modals.authenticationError(_errorContext);
            } else {
                FlowRouter.go("/projects");
            }
        });
    },
    updateTitle(event) {
        this.setState({title: event.target.value});
    },
    render() {
        return (
            <div className="col-md-6 center">
                <div className="box box-bordered box-color">
                    <div className="box-title">
                        <input id="projectTitle" className="form-control" value={this.state.title} onChange={this.updateTitle} placeholder="Project Title"/>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
//<h3 id="projectTitle" contentEditable="true">{this.state.title}</h3>