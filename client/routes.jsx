FlowRouter.route("/", {
    name: "home",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.homePage />
        });
        setActiveLink();
    }
});

FlowRouter.route("/home", {
    name: "home",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.homePage />
        });
        setActiveLink();
    }
});

FlowRouter.route("/login", {
    name: "login",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.loginForm />
        });
        setActiveLink();
    }
});

FlowRouter.route("/logout", {
    name: "logout",
    action() {
        Meteor.logout();
        FlowRouter.go("/");
    }
});

FlowRouter.route("/projects", {
    name: "projects",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.manageProjects />
        });
    }
});

FlowRouter.route("/startTracking", {
    name: "start tracking",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.startTracking />
        });
        setActiveLink();
    }
});

FlowRouter.route("/signUp", {
    name: "sign up",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.signUpForm />
        });
        setActiveLink();
    }
});

FlowRouter.route("/features", {
    name: "login",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.features />
        });
        setActiveLink();
    }
});

//FlowRouter.route("/focus", {
//
//    action: function() {
//        if (!Meteor.user()) {
//            var _name = Meteor.lockstep.generateSillyName();
//            var _randomId = new Meteor.Collection.ObjectID()._str;
//            var _randomPassword = new Meteor.Collection.ObjectID()._str;
//            Accounts.createUser({
//                email: _randomId + "@lockstep.net",
//                password: _randomPassword,
//                profile: {
//                    sillyName: _name
//                }
//            }, function() {
//                Meteor.call("findAndJoinTeam", function(error, teamId) {
//                    console.log("found team ", teamId);
//                });
//            });
//
//        } else {
//            Meteor.call("findAndJoinTeam", function(error, teamId) {
//                console.log("found team ", teamId);
//            });
//        }
//        BlazeLayout.render("layout", {header: "header", main: "focus"});
//        setActiveLink();
//    }
//});
//
//FlowRouter.route("/history", {
//    action: function() {
//        BlazeLayout.render("layout", {header: "header", main: "history"});
//        setActiveLink();
//    }
//});
//
//
//FlowRouter.route("/pricing", {
//    action: function() {
//        BlazeLayout.render("layout", {header: "header", main: "pricing"});
//        setActiveLink();
//    }
//});
//
//
//FlowRouter.route("/save", {
//    action: function() {
//        BlazeLayout.render("layout", {header: "header", main: "saveAccount"});
//        setActiveLink();
//    }
//});
//
//
//FlowRouter.route("/login", {
//    action: function() {
//        Meteor.loginWithFacebook(function() {
//            FlowRouter.go("/lockstep");
//        });
//    }
//});
//
//FlowRouter.route("/logout", {
//    action: function() {
//        Meteor.logout(function() {
//            FlowRouter.go("/");
//        });
//    }
//});
//
//
//FlowRouter.route("/help", {
//    action: function() {
//        BlazeLayout.render("layout", {header: "header", main: "help"});
//        setActiveLink();
//    }
//});

var setActiveLink = function() {
    Session.set("activeUrl", FlowRouter.current().route.path);
};