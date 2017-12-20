var currentTime = function() {
  var now = new Date();
  document.getElementById("now").innerHTML = now;
  return now;
};
setInterval(currentTime, 1000); // Auto loads when script is called

var newRandomTime = function(least, most) {
  var max = Math.ceil(most);
  var min = Math.floor(least);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var newRandomDate = function(least, most) {
  var max = Math.ceil(most);
  var min = Math.floor(least);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var randomDay = function(year, month) {
  var max = Math.ceil(new Date(year, month, 0).getDate());
  var min = Math.floor(1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomInterval = function(lastint) {
  var max = Math.ceil(lastint);
  var min = Math.floor(1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomTime = function() {
  var year = newRandomDate(0, 2017);
  var month = newRandomDate(0, 11); // is 0-based
  var day = randomDay(1, new Date(year, month, 0).getDate());
  var hours = newRandomTime(0, 23); // is 0-based
  var minutes = newRandomTime(0,59); // is 0-based
  var seconds = newRandomTime(0,59); // is 0-based
  var systemFormat = new Date(year, month, day, hours, minutes, seconds);
  document.getElementById('systemFormat').innerHTML = systemFormat;

  return systemFormat;
};

var setProgressBar = function() {
  document.getElementById("btmProgress").setAttribute("aria-valuemin", "0");
  document.getElementById("btmProgress").setAttribute("aria-valuemax", "100");
  document.getElementById("btmProgress").setAttribute("aria-valuenow", "0");
  document.getElementById("btmProgress").setAttribute("style", "width: 0%;");
};
var updateProgressBar = function(num) {
  document.getElementById("btmProgress").setAttribute("aria-valuenow", num);
  document.getElementById("btmProgress").setAttribute("style", "width: " + num + "%;");
};
var resetProgressbar = function() {
  document.getElementById("btmProgress").className = document.getElementById("btmProgress").className += " progress-bar-striped progress-bar-animated";
  document.getElementById("btmProgress").className = document.getElementById("btmProgress").className.replace( /(?:^|\s)bg-danger(?!\S)/g , ' bg-success' );
};
var failProgressbar = function() {
  document.getElementById("btmProgress").className = document.getElementById("btmProgress").className.replace( /(?:^|\s)progress-bar-striped progress-bar-animated(?!\S)/g , ' ' );
  document.getElementById("btmProgress").className = document.getElementById("btmProgress").className.replace( /(?:^|\s)bg-success(?!\S)/g , ' bg-danger' );
};
var displayErrors = function(bool){
  var errorElement = document.getElementsByClassName("popError");
  var display = bool ? "block" : "none";
  for (var i = 0; i < errorElement.length; i++) {
    errorElement[i].style.display = display;
  }
};
var travelMath = function(rt){
  var fromYear = currentTime().getFullYear();
  var toYear = rt.getFullYear();
  document.getElementById("travelMath").innerHTML = "Your attempt to travel from: " + fromYear + " to: " + toYear + " (" + (toYear-fromYear)*-1  + ") year's into the past will not work with this version of the time machine.";
};
var loopNum = 10;


var timeLoop = function() {
  var newProgress = 0;
  var inter = randomInterval(100);
  document.getElementById('results').className = "oldResults";
  resetProgressbar();
  displayErrors(false);
  for (var i = 1; i <= loopNum; i++) {
    if (i === loopNum) {
      setTimeout(function() {
        document.getElementById('results').className = 'failedResults';
        rt = randomTime();
        failProgressbar();
        updateProgressBar(newProgress + randomInterval(100 - newProgress));
        travelMath(rt);
        displayErrors(true);
      }, inter);
    }else {
      setTimeout(function() {
        randomTime();
        newProgress += ((loopNum - i) / loopNum) *-100;
        updateProgressBar(newProgress);
      }, inter);
      inter += randomInterval(inter);
    }
  }

};
