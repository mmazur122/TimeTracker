if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

var App = React.createClass({
    mixins: [ReactMeteorData],
    _refreshTracker: new ReactiveVar(0),
    getMeteorData() {
        console.log("inside getMeteorData");
        return {
            // this causes the component to refresh and pass the right active link to the Content Component
            activeLink: this._refreshTracker.get()
        };
    },
    componentDidMount() {
        this._refreshTracker.set("home");
    },
    render() {
        var _header = Meteor.timeTracker.reactComponents.header;
        var _content = Meteor.timeTracker.reactComponents.content;
        var _menuLinks = ["home", "startTracking", "features", "login"];
        return (
            <div className="container-fluid">
                <div id="wrapper">
                    <_header menuLinks={_menuLinks} refreshTracker={this._refreshTracker}/>
                    <div className="container">
                        <div id="main">
                            <_content activeLink={this.data.activeLink}/>
                        </div>
                    </div>
                </div>
                <div id="footer"></div>
            </div>
        );
    }
});

Meteor.timeTracker.reactComponents.flowRouterLayout = React.createClass({
    render() {
        var _header = Meteor.timeTracker.reactComponents.header;
        var _menuLinks = ["home", "startTracking", "features", "login"];
        return (
            <div className="container-fluid">
                <div id="wrapper">
                    <_header menuLinks={_menuLinks}/>
                    <div className="container">
                        <div id="main">
                            {this.props.content}
                        </div>
                    </div>
                </div>
                <div id="footer"></div>
            </div>
        );
    }
});