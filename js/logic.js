counter = 0;
num = 0;
var intervalMS = 60000;

topic = [];
response = [];
mob = [];
time = [];
sensitivity = [];

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

var beginSurvey = function() {
    num = parseInt(Q.order[counter],10);
    $("#current-form").html($("#"+num));
};

$("#current-form").submit(function( event ) {
       
    completed = new Boolean;

    if ( $("#current-form input").val() !== "" ) {
        completed = 1;
    }
    else {
        completed = 0;
    }
    
    num = parseInt(Q.order[counter],10);

    topic[counter] = num;
    response[counter] = completed;
    mob[counter] = mobMode;
    time[counter] = timeMode;
    if (Q.current_sequence == 'Ascend') {
        sensitivity[counter] = 'a';
    }
    if (Q.current_sequence == 'Descend') {
        sensitivity[counter] = 'd';
    }
    if (Q.current_sequence == 'Random') {
        sensitivity[counter] = 'r';
    }

    if (counter < Q.order.length - 1) {
        event.preventDefault();
        counter++;
        num = parseInt(Q.order[counter],10);
        $("#current-form *").replaceWith($("#"+num));
        if (timeMode === 1) {
            window.clearInterval(autoadvance);
            window.clearInterval(autotimer);
            intervalMS = 60000;
            setTimer();
        }
        $("#"+num + " input").focus();
        questions_num = Q.order.length;                      
    }
    else {
        event.preventDefault();
        $("#current-form *").replaceWith($("#finish-survey"));
    }

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
       $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + topic 
            + "\u0026response=" + response
            + "\u0026mob=" + mob 
            + "\u0026time=" + time
            + "\u0026sensitivity=" + sensitivity
            + "\u0026questions_num=" + questions_num,
        })

    $(".container").replaceWith($("#debrief"));

    outputdata = "";

    for(var formid in response){
        outputdata += formid + ': ' + response[formid]+'; ';
    }
    $("#formdata").append(outputdata);
});

