var observableModule = require("tns-core-modules/data/observable");
var appSettings = require("application-settings");
let now = new Date();



function HomeViewModel() {
  var viewModel = observableModule.fromObject({
   




    countries: [],
    /*   onItemTap: function (args) {
         console.log('Item with index: ' + args.index + ' tapped');
       },
   */

  });
  return viewModel;
}

module.exports = HomeViewModel;

