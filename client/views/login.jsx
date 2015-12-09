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
        var _email = $("#emailAddressInput").val() || "";
        var _password = $("#passwordInput").val() || "";

        //trim white spaces
        _email = _email.replace(/^\s*|\s*$/g, '');
        _password = _password.replace(/^\s*|\s*$/g, '');

        //validate
        var isValidEmail = Meteor.timeTracker.globalFunctions.checkEmailIsValid(_email);
        var isValidPassword = Meteor.timeTracker.globalFunctions.checkPasswordIsValid(_password);

        if (!isValidEmail || !isValidPassword) {
            var _errorMessages = [];
            if (!isValidEmail) {
                _errorMessages.push("Invalid email address.");
            }
            if (!isValidPassword) {
                _errorMessages.push("Your password must be at least 6 characters long.");
            }
            var _errorContext = {title: "Login Error", messages: _errorMessages};
            Meteor.timeTracker.modals.authenticationError(_errorContext);
        } else {
            Meteor.loginWithPassword(_email, _password, function (error) {
                if (error) {
                    console.log("error: ", error);
                    var _errorContext = {title: "Login Error", messages: [error.reason]};
                    Meteor.timeTracker.modals.authenticationError(_errorContext);
                } else {
                    FlowRouter.go("/");
                }
            });
        }
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
                                    <input id="emailAddressInput" className="form-control" type="text"/>
                                </div>
                                <div className="row">
                                    <h4>Password:</h4>
                                    <input id="passwordInput" className="form-control" type="password"/>
                                </div>
                                <div className="loginButton">
                                    <button className="btn btn-primary" onClick={this.login}>Login</button>
                                </div>
                                <p>Don't have an account yet? Click
                                    &nbsp;<button className="btn btn-primary" onClick={this.switchToSignUp}>Here</button>&nbsp;
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