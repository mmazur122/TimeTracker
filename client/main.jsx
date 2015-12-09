if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

var ReactTransitionGroup = React.addons.TransitionGroup;

Meteor.timeTracker.reactComponents.flowRouterLayout = React.createClass({
    render() {
        var _header = Meteor.timeTracker.reactComponents.header;
        var _menuLinks = ["home", "startTracking", "features", "login"];
        var _timeStamp = moment().valueOf();
        return (
            <div className="container-fluid">
                <div id="wrapper">
                    <_header menuLinks={_menuLinks}/>
                    <div className="container">
                        <div id="main">
                            <ReactTransitionGroup>
                                <PageTransition key={_timeStamp}>
                                    {this.props.content}
                                </PageTransition>
                            </ReactTransitionGroup>
                        </div>
                    </div>
                </div>
                <div id="footer"></div>
            </div>
        );
    }
});

var PageTransition = React.createClass({
    componentWillLeave(callback) {
        var _oldElement = ReactDOM.findDOMNode(this);
        var _newElement = $(_oldElement).siblings().not($("div[data-reactid$='" + this.props.timestamp + "']"));
        $(_newElement).css({"opacity": 0, "display": "none"});
        $(_oldElement).animate({"opacity": 0}, 400, "swing", function() {
            $(_oldElement).css({"display": "none"});
            $(_newElement).css({"display": "block"}).animate({"opacity": 1}, 400, "swing", callback);
        });
    },
    render() {
        return (
            <div data-timestamp={this.props.children.key}>{this.props.children}</div>
        );
    }
});