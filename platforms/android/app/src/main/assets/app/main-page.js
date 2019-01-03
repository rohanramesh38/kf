/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var fun;
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");
var frameModule = require("tns-core-modules/ui/frame");
/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
var createViewModel = require("./main-view-model").createViewModel;
/*
function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
  /*  var page = args.object;
fun=page;
var nnn=appSettings.getString("email","None");
console.log(nnn);

  if (nnn == "None") {
    page = args.object;
    page.bindingContext = pageData;
  
    page.bindingContext = createViewModel();
    console.log("Loaded");
  }
  else {
    //Redirect to home screen
    const navigationEntry = {
      moduleName: "home/home",
      context: { info: "Something you want to pass to your page" },
      animated: false,
      backstackVisible: true
      //clearHistory: true
     };
     const topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
  }
//  pageData.set("showError",false);

}
*/

exports.pageLoaded = function(args) {
  page = args.object;
  var isLoggedIn = appSettings.getString("email", "None");
  if (isLoggedIn == "None") {
  
   // page.bindingContext = pageData;
    console.log("Loaded");
  }
  else {
    //Redirect to home screen
    const navigationEntry = {
      moduleName: "home/home",
      context: { info: "Something you want to pass to your page" },
      animated: false,
      backstackVisible: true
      //clearHistory: true
     };
     const topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
  }
 // pageData.set("showError",false);
  //pageData.set("password","");

  page.bindingContext = createViewModel();
}
/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
//exports.onNavigatingTo = onNavigatingTo;

exports.onLogin = function(args) {
console.log("button");
var page=args.object;
var email = page.getViewById('email');
var Mail=((page.parent.getViewById('email')).text);
appSettings.setString("email",Mail);
if(Mail.includes('@knackforge.com'));
{

const navigationEntry = {
  moduleName: "home/home",
  context: { info: "Something you want to pass to your page" },
  animated: false,
  backstackVisible: true
  //clearHistory: true
 };

 const topmost = frameModule.topmost();
topmost.navigate(navigationEntry);



console.log(Mail);
}
}
