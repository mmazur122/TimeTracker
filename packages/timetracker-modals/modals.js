function DefaultCancelButton(opts) {
    this.class = opts.defaultButtonClass || 'btn btn-default';
    if (opts && opts.cancelLabel) {
        this.label = opts.cancelLabel;
    } else {
        this.label = "Cancel";
    }
};

function DefaultOkButton(opts){
    // if this is false, dialog doesnt close automatically on click
    this.closeModalOnClick = opts.closeOnOk;
    this.class = opts.okButtonClass || 'btn btn-primary btn-primary-main';
    if (opts && opts.okLabel) {
        this.label = opts.okLabel;
    } else {
        this.label = 'Save';
    }
};

function DefaultButtons(opts) {
    if (opts && opts.withCancel) {
        this.cancel = new DefaultCancelButton(opts);
    }
    if(!opts.hideOk){
        this.ok = new DefaultOkButton(opts);
    }
};

function Buttons(opts) {
    var _buttons = new DefaultButtons(opts);
    if (opts.extraButton) {
        _buttons.extraButton = {
            label : opts.extraButton.label,
            class : 'btn btn-primary btn-primary-main'
        };
    }
    return _buttons;
};

function ModalConstructor(template, title, opts) {
    this.template = template;
    this.title = title;
    this.buttons = new Buttons(opts);
    this.removeOnHide = true;
    if(opts.dataContext){
        this.doc = opts.dataContext;
    }
};

var _initAndShow = function(template, title, opts, differentClasses) {
    var _modalConstructor = new ModalConstructor(template, title, opts);
    
    if (differentClasses) {
        _modalConstructor = _.extend(_modalConstructor, differentClasses);
    }

    var _modal = ReactiveModal.initDialog(_modalConstructor);
    _modal.show();
    _modal.modalTarget.on('hidden.bs.modal', function() {
        //could add a callback hook on hidden
    });
    return _modal;
};

//var _error = function(message) {
//    var _title;
//    var _opts = {
//        withCancel: false,
//        closeOnOk: true,
//        okLabel: "Alrighty!"
//    };
//    Session.set("modalErrorMessage", message);
//    var _modal = _initAndShow(Template.modalError, _title = "Oops..", _opts);
//};


var _hideClosestTo = function(element) {
    $(element).closest(".modal.in").modal("hide");
};

if (!window.timeTracker) window.timeTracker = {};
window.timeTracker.modals = {
    initAndShow: _initAndShow,
    hideClosestTo: _hideClosestTo
};
