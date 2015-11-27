if (!Meteor.timeTracker) {
    Meteor.timeTracker = {};
}

if (!Meteor.timeTracker.reactComponents) {
    Meteor.timeTracker.reactComponents = {};
}

Meteor.timeTracker.reactComponents.homePage = React.createClass({
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 center">
                        <div className="box box-bordered box-color">
                            <div className="box-title">
                                <h3>Welcome to my <span className="brand">Time Tracker</span>!</h3>
                            </div>
                            <div className="box-content padding">
                                <div className="braggaList welcome">
                                    <ul className="fa-ul braggaList">
                                        <li><i className="fa fa-li fa-check"></i>
                                            Keep track of what you have done
                                        </li>
                                    </ul>
                                    <p className="align-center">and</p>
                                    <ul className="fa-ul braggaList">
                                        <li>
                                            <i className="fa fa-li fa-check"></i>
                                            What is still left
                                        </li>
                                        <li>
                                            <i className="fa fa-li fa-check"></i>
                                            How much time you spent on each task
                                        </li>
                                    </ul>
                                    <p className="align-center">While you can use my app as a guest, sign up to get more functionality</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});