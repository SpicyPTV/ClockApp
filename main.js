// Variable bank

var hour = 0;
var minute = 0;
var printMinute;
var second = 0;
var printSecond;
var value = 1; // Amount seconds increases
var versionNum = "1.1.2" // Stores Version
var clockMode = false; //false = 12, true = 24
var realTime = true; // true = Real Time, false = False Time
var dateFormat = false; // false = dd/mm true = mm/dd
var isClock = true; // true = Clock Pannel is on, false = Clock Pannel is off
var isTimer = false; // true = Timer Pannel is on, false = Timer Pannel is off
var isAlarm = false; // true = Alarm Pannel is on, false = Alarm Pannel is off

// Formats the Output

setInterval(function() {

     var today = new Date(); 

     var dd = String(today.getDate()).padStart(2, '0'); 
     var mm = String(today.getMonth() + 1).padStart(2, '0');
     var yyyy = today.getFullYear();
     if(dateFormat === false) {
         var today = dd + "/" + mm + "/" + yyyy;
     }else if(dateFormat === true) {
         var today = mm + "/" + dd + "/" + yyyy;
     }
            
    // Outputs date
    $("#date").html("");
    $("#ampm").html(today);

    second += value; // Increases second value
    
    if (second < 10) {
      printSecond = "0" + second;
    } else {
      printSecond = second;
    } // Formats seconds
    
    if (minute < 10) {
      printMinute = "0" + minute;
    } else {
      printMinute = minute;
    } // Formats minutes
    
    $("#display").html(hour + ":" + printMinute + ":" + printSecond);

    // Changes minute when seconds reaches 60

    if (second >= 60) {
        second = 0;
        minute += 1;
    }

    // Changes hour when minute reaches 60

    if (minute >= 60) {
        second = 0;
        minute = 0;
        hour += 1;
    }

      if(realTime === true) {

      var currentTime = new Date ( );
      var currentHours = currentTime.getHours ( );
      var currentMinutes = currentTime.getMinutes ( );
      var currentSeconds = currentTime.getSeconds ( );

      // Pad the minutes and seconds with leading zeros, if required
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
      currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
      
      if(clockMode === true) {
          currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
      }

      if(clockMode === false) {
        // Choose either "AM" or "PM" as appropriate
        var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";
        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        $("#date").html(today);
        $("#ampm").html(timeOfDay);
        if(currentHours == 0) {
            currentHours = 12;
        }
      }

      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
      
      $("#display").html(currentTimeString);
      
      }

},1000);

//Sorts out Alerts

function alertBox(x) {
    $("#alertBox").hide();
    $("#message").html(x); // Sets text to string inputed in function
    $("#alertBox").toggle(500);
}

// Hides the UI elements when the site loads

$(document).ready(function() {
    $("#container").hide(); // Hides Menu on load
    $("#alertBox").hide(); // Hides Alert on load
    // Sets text for labels
    $("#label1").html("digital");
    $("#label2").html("analog");
    $("#label3").html("timer");
    $("#label4").html("stopwatch");
    $("#label5").html("alarms");
    $("#label6").html("reminders");
    // Hides closed pannels
    $("#timerPannel").hide();
    $("#alarmPannel").hide();
    // Activates menu length
    $("#main").css("height", "7vh");
});

// Activates the sliding for menu UI

function slide() {
    $("#container").slideToggle(500);
}

// Changes clock mode between 24 hour  and 12 hour

function changeClockMode() {
  if (realTime === false) {
    clockMode = false;
    $("#clockModeChanger").html("24 Hour Clock : Off");
    alertBox("24 hour mode is off");
    $("#container").slideToggle(500);
  } else if (clockMode === false) {
    clockMode = true;
    $("#clockModeChanger").html("24 Hour Clock : On");
    alertBox("24 hour mode is on");
    $("#container").slideToggle(500);
  } else if (clockMode === true) {
    clockMode = false;
    $("#clockModeChanger").html("24 Hour Clock : Off");
    alertBox("24 hour clock is now off");
    $("#container").slideToggle(500);
  }
}

// Closes Alert box when X is pressed

function closeMessage() {
  $("#alertBox").slideToggle(500); // Closes alert message
}

// Changes clock mode between real and false

function realTimeMode() {
  if (realTime === false) {
    realTime = true; // Turns Real Time on
    $("#realTimeChanger").html("Real Time : On"); // Changes text on button
    alertBox("Real Clock is now on");
    $("#container").slideToggle(500); // Closes alert messages
  } else if (realTime === true) {
    realTime = false; // Turns Real Time off
    $("#realTimeChanger").html("Real Time : Off"); // Changes text on button
    alertBox("Real Time is now off");
    $("#container").slideToggle(500);  // Closes alert messages
  }
}

// Alerts version Number

function version() {
  alertBox("Version: " + versionNum);
  $("#container").slideToggle(500);
}

// Changes date format

function dateFormatChanger() {
    if (dateFormat === false) {
    dateFormat = true; // Changes format
    $("#dateButton").html("Date Format: mm/dd/yyyy"); // Changes text on button
    alertBox("Date Format has changed")
    $("#container").slideToggle(500); // Closes alert messages
  } else if (realTime === true) {
    dateFormat = false; // Changes format
    $("#dateButton").html("Date Format: dd/mm/yyyy"); // Changes text on button
    alertBox("Date format has changed");
    $("#container").slideToggle(500); // Closes alert messages
  }
}

// Checks / changes which pannel is active

function clockPannel() {
  if(isClock === true) {
    
  } else {
    $("#clockPannel").show();
    $("#timerPannel").hide();
    $("#alarmPannel").hide();
    $("#timer").css("height", "5vh");
    $("#main").css("height", "7vh");
    $("#alarms").css("height", "5vh");
    alertBox("clock pannel");
    isClock = true;
    isTimer = false;
    isAlarm = false;
  }
}

function timerPannel() {
  if(isTimer === true) {
    
  } else {
    $("#clockPannel").hide();
    $("#timerPannel").show();
    $("#alarmPannel").hide();
    $("#timer").css("height", "7vh");
    $("#main").css("height", "5vh");
    $("#alarms").css("height", "5vh");
    alertBox("timer pannel");
    isTimer = true;
    isClock = false;
    isAlarm = false;
  }
}

function alarmPannel() {
  if(isAlarm === true) {
    
  } else {
    $("#clockPannel").hide();
    $("#timerPannel").hide();
    $("#alarmPannel").show();
    $("#timer").css("height", "5vh");
    $("#main").css("height", "5vh");
    $("#alarms").css("height", "7vh");
    alertBox("alarm pannel");
    isTimer = false;
    isClock = false;
    isAlarm = true;
  }
}
