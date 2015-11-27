"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.loginForm = React.createClass({
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
    getActiveContent() {
        var _ret;
        if (this.state.activeContent === "login") {
            _ret = (
                <div>
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
                            <button className="btn btn-primary" onClick={this.changeForms}>Here</button>
                            to sign up
                        </p>
                    </div>
                </div>
            );
        } else {
            _ret = (
                <div>
                    <div className="box-title">
                        <h3>Sign-Up Form</h3>
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
                            <button className="btn btn-primary" onClick={this.login}>Sign Up</button>
                        </div>
                        <p>Already have an account? Click
                            <button className="btn btn-primary" onClick={this.changeForms}>Here</button>
                            to sign up
                        </p>
                    </div>
                </div>
            )
        }

        return _ret;
    },
    login(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("login");
    },
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 center">
                        <div className="box box-bordered box-color">
                            {this.getActiveContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

Template.home.onRendered(function () {
    ReactDOM.render(<LoginForm />, $("#loginContainer")[0]);
});

Template.home.onDestroyed(function () {
    ReactDOM.unmountComponentAtNode($("#loginContainer")[0]);
});