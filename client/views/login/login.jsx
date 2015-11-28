"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.loginForm = React.createClass({
    login(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("login");
    },
    switchToSignUp() {
        FlowRouter.go("/signUp");
    },
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 center">
                        <div className="box box-bordered box-color">
                            <div className="box-title">
                                <h3>Login Form</h3>
                            </div>
                            <div className="box-content padding">
                                <div className="row">
                                    <h4>Email:</h4>
                                    <input className="email-address-input form-control" type="text"/>
                                </div>
                                <div className="row">
                                    <h4>Password:</h4>
                                    <input className="password-input form-control" type="password"/>
                                </div>
                                <div>
                                    <button className="btn btn-primary" onClick={this.login}>Login</button>
                                </div>
                                <p>Don't have an account yet? Click
                                    <button className="btn btn-primary" onClick={this.switchToSignUp}>Here</button>
                                    to sign up
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});