/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

var application = require("tns-core-modules/application");


var fresco = require("nativescript-fresco");
 
if (application.android) {
    application.on("launch", function () {
        fresco.initialize();
    });
}

application.start({ moduleName: "main-page" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/




