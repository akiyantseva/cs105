counter = 0;
completedForms = new Object();
var intervalMS = 60000;

topic = [];
response = [];
mob = [];
time = [];

mobMode = 1;
timeMode = 1;

/*// on enter
$('form').keypress(function (e) {
    if (e.which == 13) {

    // ajax send info to php
    $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + $('#current-form .info').attr("topic") 
            + "\u0026response=" + $('#current-form .response').val() 
            + "\u0026mob=" + $('#current-form .info').attr("mob") 
            + "\u0026time=" + $('#current-form .info').attr("time"),
            success: nextForm
        })
    };
});*/


$(function() {
if (mobMode !== 1) {
    $(".mob-info").hide();
}
else {
    $(".mob-info").show();
}

if (timeMode !== 1) {
    $(".time-info").hide();
}
else {
    $(".time-info").show();
    setTimer();
}

});

var setTimer = function() {
    $(".time-info").html("You have <strong>" + 6 + "</strong> seconds left to answer.")
    autotimer = setInterval(function(){
            $(".time-info").html("You have <strong>" + intervalMS/10000 + "</strong> seconds left to answer.")
            intervalMS -= 10000;
    },1000);

    autoadvance = setInterval(function(){
        $("#current-form").submit();
        intervalMS = 60000;
    }, 7000);



};

$("#current-form").submit(function( event ) {
//function nextForm() {
    completed = new Boolean;

    if ( $("#current-form input").val() !== "" ) {
        completed = true;
    }
    else {
        completed = false;
    }
    
    for (var key in Q.order[counter]){
        num = parseInt(key,10); 
    }

    completedForms[num] = completed;
    console.log(completedForms[counter]);

    topic[counter] = $('#current-form .info').attr("topic");
    response[counter] = $('#current-form .info').attr("response");
    mob[counter] = $('#current-form .info').attr("mob");
    time[counter] = $('#current-form .info').attr("time"); 

    if (counter < Q.order.length ) {
        event.preventDefault();
        $("#current-form *").replaceWith($("#"+counter));
        if (timeMode === 1) {
            window.clearInterval(autoadvance);
            window.clearInterval(autotimer);
            intervalMS = 60000;
            setTimer();
        }
        $("#"+counter + " input").focus();            
        $("#current-form *").replaceWith($("#"+num));
        $("#"+num + " input").focus();            
    }
    else {
        event.preventDefault();
        $("#current-form *").replaceWith($("#finish-survey"));
    }

    counter++;

});

$('#finish-submit-button').click(function( event ) {
    $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + $topic 
            + "\u0026response=" + $response
            + "\u0026mob=" + $mob 
            + "\u0026time=" + $time,
        })
});


$('.consent-box input').click(function(){
    if ($("#consent-box").is (':checked'))
    {
        $("#start-button").fadeIn(300);
    }
    else {
        $("#start-button").fadeOut(300);
    }
});

$('#continue-debrief').click(function(){
    $(".container").replaceWith($("#debrief"));

    outputdata = "";

    for(var formid in completedForms){
        outputdata += formid + ': ' + completedForms[formid]+'; ';
    }
    $("#formdata").append(outputdata);
});

