"use strict";

function checkEmailIsValid(email) {
    email = email || '';
    return email.length > 1 && email.indexOf('@') > -1;
}

function checkPasswordIsValid(password) {
    password = password || '';
    return password.length > 7;
};

var SignUpForm = React.createClass({
    signUp(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("sign up");
    },
    render() {
        return (
            <form className="sign-up-form">
                <div>
                    <input className="email-address-input form-control" type="text"/>
                </div>
                <div>
                    <input className="password-input form-control" type="password"/>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit" onClick={this.signUp}>Sign up</button>
                </div>
            </form>
        )
    }
});

var LoginForm = React.createClass({
    login(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("login");
    },
    render() {
        return (
            <form className="login-form form-control">
                <div>
                    <input className="email-address-input form-control" type="text"/>
                </div>
                <div>
                    <input className="password-input form-control" type="password"/>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit" onClick={this.login}>Login</button>
                </div>
            </form>
        );
    }
});