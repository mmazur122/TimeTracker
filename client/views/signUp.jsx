"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

function checkEmailIsValid(aString) {
    aString = aString || '';
    return aString.length > 1 && aString.indexOf('@') > -1;
};

function checkPasswordIsValid(aString) {
    aString = aString || '';
    return aString.length >= 6;
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
        var emailAddress = $("#emailAddressInput").val() || '';
        var password = $("#passwordInput").val() || '';

        //trim white spaces
        emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
        password = password.replace(/^\s*|\s*$/g, '');

        //validate
        var isValidEmail = checkEmailIsValid(emailAddress);
        var isValidPassword = checkPasswordIsValid(password);

        if (!isValidEmail || !isValidPassword) {
            var _errorMessages = [];
            if (!isValidEmail) {
                _errorMessages.push("Invalid email address.");
            }
            if (!isValidPassword) {
                _errorMessages.push("Your password must be at least 8 characters long.");
            }
            var _errorContext = {title: "Sign-up Error", messages: _errorMessages};
            Meteor.timeTracker.modals.authenticationError(_errorContext);
        } else {
            Accounts.createUser({
                email: emailAddress,
                password: password
            }, function (error) {
                if (error) {
                    var _errorContext = {title: "Sign-up Error", messages: ["Account creation failed for unknown reasons :("]};
                    Meteor.timeTracker.modals.authenticationError(_errorContext);
                } else {
                    FlowRouter.go("/home");
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
                                <div>
                                    <button className="btn btn-primary" onClick={this.signUp}>Sign Up</button>
                                </div>
                                <p>Already have an account? Click
                                    <button className="btn btn-primary" onClick={this.switchToLogin}>Here</button>
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