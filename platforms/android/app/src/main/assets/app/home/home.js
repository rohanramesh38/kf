var appSettings = require("application-settings");
var frameModule = require("tns-core-modules/ui/frame");
var HomeViewModel = require("./home-view-model");
var colorModule = require("color");
var kom = [], sta = [], mom;
var lo, email;
var http = require("http");
let mon = ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let day = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
var homeViewModel = new HomeViewModel();
let now = new Date();
let c = [], mv;
var pb = [], count = 0;
var ld = new Date(now.getFullYear(), now.getMonth() + 1, 0);
function pageLoaded(args) {
  console.log('1');
  var check;
  c = [];

  count = 0;
  pb = [];
email=appSettings.getString("email");
  http.request({

    url: "http://food.dev.knackforge.com/api/user/food?email=" + encodeURIComponent(email),
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "KF-FOOD-AWSSDSFRTRTRGRGR",
      "Authorization": "Basic a25hY2tmb3JnZTprbmFja2Zvcmdl",
    },
  }).then(function (response) {
    result = response.content.toJSON();
    appSettings.setString("key", JSON.stringify(result.food));

  }, function (e) {
    console.log("Error occurred " + e);
  });
  check = appSettings.getString("key");
  check = JSON.parse(check);
  for (x in check) {
    pb.push(String(x).split("-")[2]);
    if ((String(x).split("-")[2] >= now.getDate()))
      c.push(String(x));
  }

  console.log(c);
  var fd = new Date(now.getFullYear(), now.getMonth(), 1);

  var page = args.object;
  homeViewModel.set("year", mon[now.getMonth()] + " " + now.getFullYear())
  let countrie = [];
  ce = [], mom;
  var k = ld.getDate();
  var today = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), 1);

  if (fd.getDay() == 6) {
    tomorrow.setDate(fd.getDate() - 5);
    k = k + 5;
  } else
    if (fd.getDay() == 2) {
      tomorrow.setDate(fd.getDate() - 1);
      k = k + 1;
    } else
      if (fd.getDay() == 3) {
        tomorrow.setDate(fd.getDate() - 2);
        k = k + 2;
      }
      else if (fd.getDay() == 4) {
        tomorrow.setDate(fd.getDate() - 3);
        k = k + 3;
      }
      else
        if (fd.getDay() == 5) {
          tomorrow.setDate(fd.getDate() - 4);
          k = k + 4;
        }
        else
          if (fd.getDay() == 0) {
            tomorrow.setDate(fd.getDate() - 6);
            k = k + 6;
          }


  for (let o = 0; o < k; o++) {

    if (tomorrow.getDay() != 0 && tomorrow.getDay() != 6) {
      countrie.push({ day: day[tomorrow.getDay()], date: tomorrow.getDate(), imageSrc: "http://fabfabricsonline.com/media/catalog/product/cache/1/image/510x510/9df78eab33525d08d6e5fb8d27136e95/h/d/hd3002-510.jpeg", year: mon[tomorrow.getMonth()] });
      count++;
    }
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  fun = page;
  homeViewModel.set("countries", countrie);

  lo = 0;

  gv = page.getViewById("list-view");
  page.bindingContext = homeViewModel;
  homeViewModel.set("ear", "KF-FRS  2K" + (now.getFullYear() - 2000) + "-" + (now.getFullYear() - 2000 + 1));
}
exports.onItemTap = function (args) {
  c = "";
  let button = args.object;
  var el1 = button.getViewById('label1');
  var el2 = button.getViewById('label2');
  var el3 = button.getViewById('label3');
  var sl = args.view;
  if (el1.text >= now.getDate()) {
    if (sl.backgroundColor == "#DCEDC8") {
      sl.backgroundColor = new colorModule.Color("#FFFFFF");
      var remE = now.getFullYear() + "-" + (mon.indexOf(el3.text) + 1) + "-" + el1.text;
      c = remE;
      params = { 'email': email, 'date': c };
      sendDatadel(params);
    } else if (sl.backgroundColor == "#FFFFFF") {
      sl.backgroundColor = new colorModule.Color("#DCEDC8");
      var addE = now.getFullYear() + "-" + (mon.indexOf(el3.text) + 1) + "-" + el1.text;
      c = addE;
      params = { 'email': email, 'date': c };
      sendData(params);

    }
  }


}
exports.pageLoaded = pageLoaded;
exports.labelLoaded = function (args) {
  var pge = args.object
  kom.push(pge.parent);
  lo++;
  if (lo == count) {
    chan();
  }


}
exports.onButtonTap = function (args) {
  var pge = args.object;
  c = [];

  for (let a = 0; a < kom.length; a++) {
    if ((kom[a].getViewById('label1').text) >= now.getDate() && mon.indexOf(kom[a].getViewById('label3').text) >= now.getMonth()) {
      kom[a].backgroundColor = "#DCEDC8";
      var addE = now.getFullYear() + "-" + (mon.indexOf(kom[a].getViewById('label3').text) + 1) + "-" + (kom[a].getViewById('label1').text);
      c.push(addE);
    }
    mom = kom[a];
  }

  params = { 'email': email, 'dates': c };


  sendDatas(params);
}

exports.onButtonTap2 = function (args) {
  c = [];
  ce = [];
  for (let a = 0; a < kom.length; a++) {

    if ((kom[a].getViewById('label1').text) >= now.getDate() && (mon.indexOf(kom[a].getViewById('label3').text) >= now.getMonth())) {
      kom[a].backgroundColor = "#FFFFFF";
      var addE = now.getFullYear() + "-" + (mon.indexOf(kom[a].getViewById('label3').text) + 1) + "-" + (kom[a].getViewById('label1').text)
      c.push(addE);
    }
  }

  params = { 'email': email, 'dates': c };
  sendDatasdel(params);

}

function chan() {
  var u = appSettings.getString("datesFoodBooked");
  u = u.split(",");

  var ff = kom[ld.getDate() - 1];

  for (let p = 0; p < pb.length; p++) {

    for (let a = 0; a < kom.length; a++) {
      if ((kom[a].getViewById('label1').text) == pb[p]) {
        if ((kom[a].getViewById('label1').text) >= now.getDate())
          kom[a].backgroundColor = "#DCEDC8";

      }
      if ((kom[a].getViewById('label1').text) < now.getDate()) {
        kom[a].backgroundColor = "#E8E8E8";
        kom[a].getViewById('label1').color = "#787878";
        kom[a].getViewById('label2').color = "#787878";
        kom[a].getViewById('label3').color = "#787878";

      }

      if (mon.indexOf(kom[a].getViewById('label3').text) < now.getMonth()) {
        kom[a].backgroundColor = "#E8E8E8";
        kom[a].getViewById('label1').color = "#787878";
        kom[a].getViewById('label2').color = "#787878";
        kom[a].getViewById('label3').color = "#787878";
      }
    }
  }

  var su = String(ld.getDate());
  if (pb.indexOf(su) > 0) {
    (kom[kom.length - 1]).backgroundColor = "#DCEDC8";
    console.log(pb.indexOf(ld.getDate()));
    kom[kom.length - 1].getViewById('label1').color = "#0F0F0F";
    kom[kom.length - 1].getViewById('label2').color = "#0F0F0F";
    kom[kom.length - 1].getViewById('label3').color = "#0F0F0F";
  }
  else {
    (kom[kom.length - 1]).backgroundColor = "#FFFFFF";
    kom[kom.length - 1].getViewById('label1').color = "#0F0F0F";
    kom[kom.length - 1].getViewById('label2').color = "#0F0F0F";
    kom[kom.length - 1].getViewById('label3').color = "#0F0F0F";
  }
  console.log(pb);

}

function sendData(params) {
  console.log("setvalue " + JSON.stringify(params));
  http.request({

    url: "http://food.dev.knackforge.com/api/food/add",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "KF-FOOD-AWSSDSFRTRTRGRGR",
      "Authorization": "Basic a25hY2tmb3JnZTprbmFja2Zvcmdl"
    },
    content: JSON.stringify(params)


  }).then(function (response) {

    console.log(response.content);
   
  //    console.log(response.content.message);
    
  }, function (e) {

  });

}

function sendDatadel(params) {
  console.log("delvalue " + JSON.stringify(params));
  http.request({

    url: "http://food.dev.knackforge.com/api/food/delete",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "KF-FOOD-AWSSDSFRTRTRGRGR",
      "Authorization": "Basic a25hY2tmb3JnZTprbmFja2Zvcmdl"
    },

    content: JSON.stringify(params)


  }).then(function (response) {

    console.log(response.content);
    if ("message" in response.content) {
      console.log(message);
    }
  }, function (e) {

  });

}


function sendDatasdel(params) {
  console.log("delvalues " + JSON.stringify(params));
  http.request({

    url: "http://food.dev.knackforge.com/api/food/delete",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "KF-FOOD-AWSSDSFRTRTRGRGR",
      "Authorization": "Basic a25hY2tmb3JnZTprbmFja2Zvcmdl"
    },
    content: JSON.stringify(params)


  }).then(function (response) {

    console.log(response.content);
    if ("error" in result) {
    }
  }, function (e) {

  });

}


function sendDatas(params) {
  console.log("setvalues " + JSON.stringify(params));
  http.request({

    url: "http://food.dev.knackforge.com/api/food/add",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "KF-FOOD-AWSSDSFRTRTRGRGR",
      "Authorization": "Basic a25hY2tmb3JnZTprbmFja2Zvcmdl"
    },
    content: JSON.stringify(params)


  }).then(function (response) {

    console.log(response.content);
    if ("error" in result) {
    }
  }, function (e) {

  });

}


exports.onSignOut=function(args){
  var index = args.index;

appSettings.remove("email");

  const navigationEntry = {
    moduleName: "main-page",
    context: { info: "Something you want to pass to your page" },
    animated: false,
    backstackVisible: true
    //clearHistory: true
   };

   const topmost = frameModule.topmost();
  topmost.navigate(navigationEntry);


    console.log("sing out tapped");
}




