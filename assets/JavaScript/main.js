// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAh9DCsVgte_Z9YpY27v9UuyxvtY_wW-N8",
    authDomain: "train-schedule-b4666.firebaseapp.com",
    databaseURL: "https://train-schedule-b4666.firebaseio.com",
    projectId: "train-schedule-b4666",
    storageBucket: "",
    messagingSenderId: "1079970922032",
    appId: "1:1079970922032:web:fa159d2112845ab0d9f7f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initial variable setups
var database = firebase.database();

var minutesTilTrain = 0;

var tableRow = "";

//Function to pull info from form & add it to database
$("#submitButton").on("click", function () {
    event.preventDefault();

    var trainToAdd = $("#train-name").val().trim();
    var destinationToAdd = $("#train-destination").val().trim();
    var firstArrivalToAdd = $("#first-arrival").val().trim();
    var frequencyToAdd = $("#train-frequency").val().trim();

    //Converting first arrival time
    var firstArrivalConverted = moment(firstArrivalToAdd, "hh:mm").subtract(1, "years");

    //Difference between first arrival & current time
    var timeDifference = moment().diff(moment(firstArrivalConverted), "minutes");

    //Gets a remainder to figure out minutes away with next step
    var tRemainder = timeDifference % frequencyToAdd;

    //Finds minutes until next train
    var minutesTilTrain = frequencyToAdd - tRemainder;

    //Next Train
    var nextTrain = moment().add(minutesTilTrain, "minutes").format("hh:mm A");

    //Create object for upload to database
    var addedTrain = {
        trainToAdd: trainToAdd,
        destinationToAdd: destinationToAdd,
        firstArrivalToAdd: firstArrivalToAdd,
        frequencyToAdd: frequencyToAdd,
        nextTrain: nextTrain,
        minutesTilTrain: minutesTilTrain
    };

    //Push to database
    database.ref().push(addedTrain);

    //Empty Form
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-arrival").val("");
    $("#train-frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var trainToAdd = childSnapshot.val().trainToAdd;
    var destinationToAdd = childSnapshot.val().destinationToAdd;
    var firstArrivalToAdd = childSnapshot.val().firstArrivalToAdd;
    var frequencyToAdd = childSnapshot.val().frequencyToAdd;
    var nextTrain = childSnapshot.val().nextTrain;
    var minutesTilTrain = childSnapshot.val().minutesTilTrain;

    //Updating time information for items pulled from database (probably could have done this better, but it works...)
    //Converting first arrival time
    var firstArrivalConverted = moment(firstArrivalToAdd, "hh:mm").subtract(1, "years");
    //Difference between first arrival & current time
    var timeDifference = moment().diff(moment(firstArrivalConverted), "minutes");
    //Gets a remainder to figure out minutes away with next step
    var tRemainder = timeDifference % frequencyToAdd;
    //Finds minutes until next train
    var minutesTilTrain = frequencyToAdd - tRemainder;
    //Next Train
    var nextTrain = moment().add(minutesTilTrain, "minutes").format("hh:mm A");


    //vars to insert train info into table
    var tableRow = $("<tr>");
    var trainNameData = $("<td>").text(trainToAdd);
    var destinationData = $("<td>").text(destinationToAdd);
    var frequencyData = $("<td>").text(frequencyToAdd + " mins");
    var nextTrainData = $("<td>").text(nextTrain);
    var minutesTilTrainData = $("<td>").text(minutesTilTrain);

    //adding table data to a table row
    tableRow.append(trainNameData, destinationData, frequencyData, nextTrainData, minutesTilTrainData);

    //adding the table row to the table
    $("#scheduleTable").append(tableRow);

});