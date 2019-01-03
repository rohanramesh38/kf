var Observable = require("tns-core-modules/data/observable").Observable;
var appSettings = require("application-settings");
var http = require("http");
function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    const viewModel = new Observable();
   /* viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }*/


    var nnn=appSettings.getString("email","None");
    console.log(nnn);


    return viewModel;
}

exports.createViewModel = createViewModel;