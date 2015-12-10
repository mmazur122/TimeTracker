"use strict";

if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

function unCamelCase(string) {
    var _unCamelCasedString = string.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    return _unCamelCasedString.charAt(0).toUpperCase() + _unCamelCasedString.slice(1);
}

Meteor.timeTracker.reactComponents.header = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var _data = {};
        if (Meteor.userId()) {
            _data.menuLinks = ["home", "projects", "todos", "logout"];
        } else {
            _data.menuLinks = ["home", "todos", "login"];
        }
        return _data;
    },
    getMenuLinks() {
        var _markup = [];
        _.each(this.data.menuLinks, (menuLinkName, index) => {
            _markup.push(<li className="topNav"
                             onClick={this.changeRoute.bind(this, menuLinkName)} key={index}>
                <a>{unCamelCase(menuLinkName)}</a></li>);
        });

        var _ret = _markup.map(function (node) {
            return node;
        });

        return _ret;
    },
    changeRoute(linkName) {
        this.setState({activeLink: linkName});
        var _route = "/";
        if (linkName !== "home") {
            _route += linkName;
        }
        FlowRouter.go(_route);
    },
    goHome() {
        FlowRouter.go("/home");
    },
    getLoggedInMenu() {
        var _ret = "";
        var _user = Meteor.user();
        if (_user) {
            _ret = _user.emails[0].address || "Unknown name";
        }
        return _ret;
    },
    render() {
        return (
            <div id="navigation" className="navbar-fixed-top myNavbar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <a onClick={this.goHome} id="myBrand">&nbsp;</a>

                            <h2>Time Tracker</h2>
                        </div>
                        <div className="col-md-8">
                            <ul className="main-nav hidden-xs hidden-sm">
                                {this.getMenuLinks()}
                            </ul>
                            <ul className="main-nav hidden-xs hidden-sm pull-right">
                                <li className="topNav"><a>{this.getLoggedInMenu()}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});