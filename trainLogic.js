var config = {
    apiKey: "AIzaSyBvMGrRXiiCkkbRC6kh0QoYy02-isijLBE",
    authDomain: "train-scheduler-3668c.firebaseapp.com",
    databaseURL: "https://train-scheduler-3668c.firebaseio.com",
    projectId: "train-scheduler-3668c",
    storageBucket: "train-scheduler-3668c.appspot.com",
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainTime = $("#time-input").val().trim();
      var trainFreq = $("#frequency-input").val().trim();

  var newTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      frequency: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination; 
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency; 
    
    console.log (trainName);
    console.log (trainDest);
    console.log (trainTime);
    console.log (trainFreq);

    var trainTimePretty = moment.unix(trainTime).format("HH:mm");

    var currentTime= moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var diffTime = moment().diff(moment(trainTimePretty), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTIME);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);
    
});



  