"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.modals) {
    Meteor.timeTracker.modals = {};
}

Meteor.timeTracker.reactComponents.features = React.createClass({
    getTodos(todos) {
        var _markup = todos.map((todo, index) => {
            return <li key={index}><i className="fa fa-li fa-check"></i>{todo}</li>
        });

        return _markup.map((node) => {
            return node;
        })
    },
    todos: [
        "Add cell phone support",
        "Add indented step lists",
        "Add option to change user password",
        "Implement the 'Forgot your password?' mechanism",
        "Add more animations",
        "Implement login with social media accounts",
        "Refactor code to be more customizable",
        "Implement project collaboration between users",
        "Fix any bugs I missed"
    ],
    render() {
        return (
            <div className="row">
                <div className="col-md-10 center">
                    <div className="box box-bordered box-color">
                        <div className="box-title">
                            <h3>TODO's</h3>
                        </div>
                        <div className="box-content padding">
                            <div className="braggaList welcome">
                                <ul className="fa-ul braggaList">
                                    {this.getTodos(this.todos)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});