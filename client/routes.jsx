FlowRouter.route("/", {
    name: "home",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.homePage />
        });
    }
});

FlowRouter.route("/home", {
    name: "home",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.homePage />
        });
    }
});

FlowRouter.route("/login", {
    name: "login",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.loginForm />
        });
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

FlowRouter.route("/projects/editProject/:projectId", {
    name: "projects",
    action(params) {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.createProject projectId={params.projectId} />
        });
    }
});

FlowRouter.route("/createProject", {
    name: "create Project",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.createProject />
        });
    }
});


FlowRouter.route("/projects/startTracking/:projectId", {
    name: "start tracking",
    action(params) {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.startTracking projectId={params.projectId}/>
        });
    }
});

FlowRouter.route("/signUp", {
    name: "sign up",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.signUpForm />
        });
    }
});

FlowRouter.route("/features", {
    name: "login",
    action() {
        var FlowRouterLayout = Meteor.timeTracker.reactComponents.flowRouterLayout;
        ReactLayout.render(FlowRouterLayout, {
            content: <Meteor.timeTracker.reactComponents.features />
        });
    }
});

var setActiveLink = function() {
    Session.set("activeUrl", FlowRouter.current().route.path);
};