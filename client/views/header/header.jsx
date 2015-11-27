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
    menuLinks: ["home", "startTracking", "features", "login"],
    getInitialState() {
        return ({activeLink: "home"});
    },
    checkIfActive(linkContext) {
        return linkContext.name === this.state.activeLink ? "active" : "";
    },
    getMenuLinks() {
        var _markup = [];
        _.each(this.props.menuLinks, (menuLinkName, index) => {
            console.log("this inside getMenuLinks: ", this);
            _markup.push(<li className={"topNav " + this.checkIfActive(menuLinkName)} onClick={this.changeActiveLink.bind(this, menuLinkName)} key={index}><a>{unCamelCase(menuLinkName)}</a></li>);
        });

        var _ret = _markup.map(function(node) {
            return node;
        });

        return _ret;
    },
    changeActiveLink(linkName) {
        this.setState({activeLink: linkName});
        this.props.refreshTracker.set(linkName);
    },
    render() {
        return (
            <div id="navigation" className="navbar-fixed-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <a href="/" id="myBrand">&nbsp;</a>

                            <h2>Time Tracker</h2>
                        </div>
                        <div className="col-md-8">
                            <ul className="main-nav hidden-xs hidden-sm">
                                {this.getMenuLinks()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});