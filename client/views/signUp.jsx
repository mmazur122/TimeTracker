"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.signUpForm = React.createClass({
    getInitialState() {
        return {activeContent: "login"};
    },
    changeForms() {
        if (this.state.activeContent === "login") {
            this.setState({activeContent: "signUp"});
        } else {
            this.setState({activeContent: "login"});
        }
    },
    signUp(event) {
        event.preventDefault();
        event.stopPropagation();
        var _emailAddress = $("#emailAddressInput").val() || '';
        var _password = $("#passwordInput").val() || '';

        //trim white spaces
        _emailAddress = _emailAddress.replace(/^\s*|\s*$/g, '');
        _password = _password.replace(/^\s*|\s*$/g, '');

        //validate
        var isValidEmail = Meteor.timeTracker.globalFunctions.checkEmailIsValid(_emailAddress);
        var isValidPassword = Meteor.timeTracker.globalFunctions.checkPasswordIsValid(_password);

        if (!isValidEmail || !isValidPassword) {
            var _errorMessages = [];
            if (!isValidEmail) {
                _errorMessages.push("Invalid email address.");
            }
            if (!isValidPassword) {
                _errorMessages.push("Your password must be at least 6 characters long.");
            }
            var _errorContext = {title: "Sign-up Error", messages: _errorMessages};
            Meteor.timeTracker.modals.authenticationError(_errorContext);
        } else {
            Accounts.createUser({
                email: _emailAddress,
                password: _password
            }, function (error) {
                if (error) {
                    var _errorContext = {title: "Sign-up Error", messages: [error.reason]};
                    Meteor.timeTracker.modals.authenticationError(_errorContext);
                } else {
                    FlowRouter.go("/");
                }
            });
        }
    },
    switchToLogin() {
        FlowRouter.go("/login");
    },
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 center">
                        <div className="box box-bordered box-color">
                            <div className="box-title">
                                <h3>Sign-Up Form</h3>
                            </div>
                            <div className="box-content padding">
                                <div className="row">
                                    <h4>Email:</h4>
                                    <input id="emailAddressInput" className="form-control" type="text"/>
                                </div>
                                <div className="row">
                                    <h4>Password: (at least 6 characters long)</h4>
                                    <input id="passwordInput" className="form-control" type="password"/>
                                </div>
                                <div className="loginButton">
                                    <button className="btn btn-primary" onClick={this.signUp}>Sign Up</button>
                                </div>
                                <p>Already have an account? Click
                                    &nbsp;<button className="btn btn-primary" onClick={this.switchToLogin}>Here</button>&nbsp;
                                      to log in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});