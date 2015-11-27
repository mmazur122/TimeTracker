Package.describe({
    summary: "Modals"
});

Package.on_use(function (api) {
	api.use(['underscore'], ['client']);
    api.add_files("modals.js", ["client"]);
});